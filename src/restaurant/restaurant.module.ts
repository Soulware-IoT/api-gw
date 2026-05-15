import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';

@Module({
  imports: [HttpModule],
  providers: [RestaurantService],
  controllers: [RestaurantController]
})
export class RestaurantModule {}
