import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Las credenciales de Supabase no están configuradas en el archivo .env');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async register(authDto: AuthDto) {
    const { data, error } = await this.supabase.auth.signUp({
      email: authDto.email,
      password: authDto.password,
    });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return { message: 'Registro exitoso. Revisa tu correo si tienes confirmación habilitada.', data };
  }

  async login(authDto: AuthDto) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: authDto.email,
      password: authDto.password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Login exitoso', session: data.session };
  }
}
