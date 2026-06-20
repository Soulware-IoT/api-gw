import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { JwtClaims } from '../types/jwtClaims';
import { GatewayHeadersBuilder } from './gateway-headers.builder';
import { translate } from '../i18n/translate';

@Injectable()
export class ForwardService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly headersBuilder: GatewayHeadersBuilder,
  ) {}

  async forward(req: any): Promise<any> {
    const serviceUrl = this.configService.getOrThrow<string>('BACKEND_URL');
    const payload: JwtClaims = req.user;
    const headers = this.headersBuilder.build(req.headers, payload);

    try {
      const response = await lastValueFrom(
        this.httpService.request({
          method: req.method,
          url: `${serviceUrl}${req.url}`,
          data: req.body,
          headers,
        }),
      );

      return response.data;
    } catch (error) {
      throw this.toHttpException(error, req.headers?.['accept-language']);
    }
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

    // No response: backend unreachable, DNS failure, or timeout.
    return new HttpException(
      translate('gateway.upstream_unavailable', acceptLanguage),
      502,
    );
  }
}
