import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { GatewayHeadersBuilder } from './gateway-headers.builder';
import { translate } from '../i18n/translate';

@Injectable()
export class ForwardService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly headersBuilder: GatewayHeadersBuilder,
  ) {}

  /// Bound the backend round-trip so a hung upstream turns into a timely 504
  /// instead of an indefinitely pending client request.
  static readonly DEFAULT_TIMEOUT_MS = 15_000;

  async forward(req: any): Promise<any> {
    const serviceUrl = this.configService.getOrThrow<string>('BACKEND_URL');
    const headers = this.headersBuilder.build(req.headers);

    try {
      const response = await lastValueFrom(
        this.httpService.request({
          method: req.method,
          url: `${serviceUrl}${req.url}`,
          data: req.body,
          headers,
          timeout: this.timeoutMs(),
        }),
      );

      return response.data;
    } catch (error) {
      throw this.toHttpException(error, req.headers?.['accept-language']);
    }
  }

  private timeoutMs(): number {
    const configured = Number(this.configService.get('FORWARD_TIMEOUT_MS'));
    return Number.isFinite(configured) && configured > 0
      ? configured
      : ForwardService.DEFAULT_TIMEOUT_MS;
  }

  private toHttpException(error: unknown, acceptLanguage?: string): HttpException {
    const axiosError = error as AxiosError;

    // Backend responded with a non-2xx — relay its status and body verbatim
    // so the client sees the real 4xx/5xx instead of a generic 500.
    if (axiosError.response) {
      return new HttpException(
        axiosError.response.data as any,
        axiosError.response.status,
      );
    }

    // Timed out waiting on the backend — 504 Gateway Timeout.
    if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
      return new HttpException(
        translate('gateway.upstream_timeout', acceptLanguage),
        504,
      );
    }

    // No response: backend unreachable or DNS failure.
    return new HttpException(
      translate('gateway.upstream_unavailable', acceptLanguage),
      502,
    );
  }
}
