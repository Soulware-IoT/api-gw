import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SupabaseConfigService {
  private readonly SUPABASE_URL_KEY: string = 'SUPABASE_URL';
  private readonly ISSUER_ENDPOINT: string = '/auth/v1';
  private readonly JWKS_ENDPOINT: string = '/.well-known/jwks.json';

  private supabaseUrl: string;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>(this.SUPABASE_URL_KEY);
    if (!supabaseUrl) {
      throw new Error('Missing SUPABASE_URL environment variable');
    }

    this.supabaseUrl = supabaseUrl;
  }

  public getSupabaseUrl(): string {
    return this.supabaseUrl;
  }

  public getIssuerUrl(): string {
    return `${this.supabaseUrl}${this.ISSUER_ENDPOINT}`;
  }

  public getJwksUrl(): string {
    return `${this.getIssuerUrl()}${this.JWKS_ENDPOINT}`;
  }
}