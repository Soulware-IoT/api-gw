import { Controller, All, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { RestaurantService } from './restaurant.service';

@Controller('api/v1')
@UseGuards(SupabaseAuthGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @All(['users', 'users/*', 'organizations', 'organizations/*'])
  async proxyRestaurant(@Req() req: any) {
    const user = req.user;

    let data = req.body;

    // Inyectar authId en body para peticiones de mutación
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      data = data || {};
      data.authId = user.id;
    }

    return this.restaurantService.forwardRequest(req.method, req.originalUrl, data);
  }
}
