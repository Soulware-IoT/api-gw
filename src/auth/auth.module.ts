import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {ConfigModule} from "@nestjs/config";
import {RestaurantModule} from "../restaurant/restaurant.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      ConfigModule,
      RestaurantModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
