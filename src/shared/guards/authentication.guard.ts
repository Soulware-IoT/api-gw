import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { createRemoteJWKSet } from 'jose/jwks/remote';
import { JWTPayload, jwtVerify } from 'jose';
import { SupabaseConfigService } from '../supabase/supabase-config.service';

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
    const authHeader: string = this.getAuthHeader(request);
    const token: string = this.getToken(authHeader);
    request.user = await this.getPayload(token);

    return true;
  }

  private getAuthHeader(request): string {
    const authHeader: string = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        'No authorization header provided',
      );
    }

    return authHeader;
  }

  private getToken(authHeader: string): string {
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid authorization format');
    }

    if (!token) {
      throw new UnauthorizedException('No auth token provided');
    }

    return token;
  }

  private async getPayload(token: string): Promise<JWTPayload> {
    const options = {
      issuer: this.issuer,
      audience: 'authenticated',
    }

    try {
      const { payload } = await jwtVerify(token, this.jwks, options);
      return payload;
    } catch(e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
