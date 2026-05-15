import {Injectable, UnauthorizedException, InternalServerErrorException, BadRequestException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthDto } from './dto/auth.dto';
import {RestaurantService} from "../restaurant/restaurant.service";
import {LoginResponseDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
      private configService: ConfigService,
      private readonly restaurantService: RestaurantService
  ) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
    this.supabase = createClient(supabaseUrl!, supabaseKey!);
  }

  async register(authDto: AuthDto) {
    const { data: authData, error } = await this.supabase.auth.signUp({
      email: authDto.email,
      password: authDto.password,
    });

    if (error) throw new BadRequestException(error.message);
    if (!authData.user) throw new InternalServerErrorException('No se pudo crear el usuario en Supabase');

    const restaurantUser = {
      authId: authData.user.id,
      fullName: authDto.fullName,
      email: authDto.email
    };

    try {
      await this.restaurantService.forwardRequest(
          'POST',
          '/restaurant/api/v1/users/register',
          restaurantUser
      );
    } catch (err) {
      throw new InternalServerErrorException('Error al crear perfil en el microservicio');
    }

    return {
      message: 'Usuario creado exitosamente',
      userId: authData.user.id
    };
  }

  async login(authDto: AuthDto): Promise<LoginResponseDto> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: authDto.email,
      password: authDto.password,
    });

    if (error || !data.session) {
      throw new UnauthorizedException(error?.message || 'Credenciales inválidas');
    }

    const supabaseUser = data.user;
    const session = data.session;

    let profile;
    try {
      profile = await this.restaurantService.forwardRequest(
          'GET',
          `/restaurant/api/v1/users/by-auth/${supabaseUser.id}`
      );
    } catch (err) {
      throw new InternalServerErrorException('No se encontró el perfil de restaurante para este usuario');
    }

    return {
      profileId: profile.id,
      userId: supabaseUser.id,
      accessToken: session.access_token,
      tokenType: session.token_type,
      expiresIn: session.expires_in,
      refreshToken: session.refresh_token,
      fullName: profile.fullName,
      email: profile.email,
    };
  }
}
