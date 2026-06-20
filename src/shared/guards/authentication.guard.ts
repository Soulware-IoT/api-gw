import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { createRemoteJWKSet } from 'jose/jwks/remote';
import { JWTPayload, jwtVerify } from 'jose';
import { SupabaseConfigService } from '../supabase/supabase-config.service';
import { translate } from '../i18n/translate';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;
  private readonly issuer: string;

  constructor(private readonly supabaseConfigService: SupabaseConfigService) {
    this.issuer = this.supabaseConfigService.getIssuerUrl();
    this.jwks = createRemoteJWKSet(
      new URL(this.supabaseConfigService.getJwksUrl())
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const lang: string = request.headers?.['accept-language'];
    const authHeader: string = this.getAuthHeader(request, lang);
    const token: string = this.getToken(authHeader, lang);
    request.user = await this.getPayload(token, lang);

    return true;
  }

  private getAuthHeader(request, lang?: string): string {
    const authHeader: string = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(translate('auth.no_header', lang));
    }

    return authHeader;
  }

  private getToken(authHeader: string, lang?: string): string {
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException(translate('auth.invalid_format', lang));
    }

    if (!token) {
      throw new UnauthorizedException(translate('auth.no_token', lang));
    }

    return token;
  }

  private async getPayload(token: string, lang?: string): Promise<JWTPayload> {
    const options = {
      issuer: this.issuer,
      audience: 'authenticated',
    }

    try {
      const { payload } = await jwtVerify(token, this.jwks, options);
      return payload;
    } catch(e) {
      throw new UnauthorizedException(translate('auth.invalid_token', lang));
    }
  }
}
