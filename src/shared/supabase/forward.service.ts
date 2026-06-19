import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { JwtClaims } from '../types/jwtClaims';

@Injectable()
export class ForwardService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async forward(req: any, serviceUrlKey: string): Promise<any> {
    const serviceUrl = this.configService.getOrThrow<string>(serviceUrlKey);
    const payload: JwtClaims = req.user;
    const { method, url, body, headers: { host, ...headers } } = req;

    const response = await lastValueFrom(
      this.httpService.request({
        method,
        url: `${serviceUrl}${url}`,
        data: body,
        headers: { ...headers, 'X-Requester-Id': payload.sub },
      }),
    );

    return response.data;
  }
}
