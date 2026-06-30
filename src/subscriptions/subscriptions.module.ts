import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ForwardService } from '../shared/forward/forward.service';
import { GatewayHeadersBuilder } from '../shared/forward/gateway-headers.builder';
import { SubscriptionsService } from './service/subscriptions.service';
import { SubscriptionsController } from './controllers/subscriptions.controller';

@Module({
  imports: [HttpModule],
  controllers: [SubscriptionsController],
  providers: [ForwardService, GatewayHeadersBuilder, SubscriptionsService],
})
export class SubscriptionsModule {}
