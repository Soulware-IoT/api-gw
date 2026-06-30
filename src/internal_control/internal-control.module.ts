import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ForwardService } from '../shared/forward/forward.service';
import { GatewayHeadersBuilder } from '../shared/forward/gateway-headers.builder';
import { InternalControlService } from './service/internal-control.service';
import { InternalControlController } from './controllers/internal-control.controller';

@Module({
  imports: [HttpModule],
  controllers: [InternalControlController],
  providers: [ForwardService, GatewayHeadersBuilder, InternalControlService],
})
export class InternalControlModule {}
