import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { translate } from '../i18n/translate';
import { IS_PUBLIC_KEY } from './public.decorator';

/// Gateway-side JWT validation (defense in depth).
///
/// The backend remains the authority on identity and authorization — it
/// re-validates the token and resolves the requester from its `sub` claim.
/// This guard mirrors the backend's check (Supabase JWKS, ES256, expiry) so
/// unauthenticated traffic is rejected at the edge and never reaches the
/// backend. The `Authorization` header is still forwarded untouched.
///
/// The JWKS is fetched from `${SUPABASE_URL}/auth/v1/.well-known/jwks.json`
/// and cached by `jose` between requests.
@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private jwks?: ReturnType<typeof createRemoteJWKSet>;

  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const acceptLanguage = req.headers?.['accept-language'];

    const token = this.extractBearerToken(req.headers?.authorization);
    if (!token) {
      throw new UnauthorizedException(
        translate('gateway.missing_token', acceptLanguage),
      );
    }

    try {
      await jwtVerify(token, this.jwkSet(), {
        issuer: `${this.supabaseUrl()}/auth/v1`,
      });
      return true;
    } catch {
      throw new UnauthorizedException(
        translate('gateway.invalid_token', acceptLanguage),
      );
    }
  }

  private extractBearerToken(header?: string): string | undefined {
    if (!header) return undefined;
    const [scheme, token] = header.split(' ');
    return scheme?.toLowerCase() === 'bearer' && token ? token : undefined;
  }

  private supabaseUrl(): string {
    return this.configService
      .getOrThrow<string>('SUPABASE_URL')
      .replace(/\/$/, '');
  }

  /// Lazily built so the app can boot (and health stay green) even before
  /// SUPABASE_URL is reachable; jose caches and refreshes the key set.
  private jwkSet(): ReturnType<typeof createRemoteJWKSet> {
    this.jwks ??= createRemoteJWKSet(
      new URL(`${this.supabaseUrl()}/auth/v1/.well-known/jwks.json`),
    );
    return this.jwks;
  }
}
