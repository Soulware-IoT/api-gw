import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { JwtClaims } from '../types/jwtClaims';

// Hop-by-hop / body-derived headers that must not be forwarded as-is — the
// outbound request recomputes them (a stale content-length truncates the body).
const EXCLUDED_REQUEST_HEADERS = ['host', 'content-length', 'connection'];

@Injectable()
export class ForwardService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async forward(req: any, serviceUrlKey: string): Promise<any> {
    const serviceUrl = this.configService.getOrThrow<string>(serviceUrlKey);
    const payload: JwtClaims = req.user;
    const headers = this.buildHeaders(req.headers, payload);

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
      throw this.toHttpException(error);
    }
  }

  private buildHeaders(
    incoming: Record<string, any>,
    payload: JwtClaims,
  ): Record<string, any> {
    const headers: Record<string, any> = {};
    for (const [key, value] of Object.entries(incoming ?? {})) {
      if (!EXCLUDED_REQUEST_HEADERS.includes(key.toLowerCase())) {
        headers[key] = value;
      }
    }
    headers['X-Requester-Id'] = payload.sub;
    return headers;
  }

  private toHttpException(error: unknown): HttpException {
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
    return new HttpException('Upstream service unavailable', 502);
  }
}
