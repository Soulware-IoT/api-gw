import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ForwardService } from '../shared/forward/forward.service';
import { GatewayHeadersBuilder } from '../shared/forward/gateway-headers.builder';
import { SecurityService } from './service/security.service';
import { SecurityController } from './controllers/security.controller';

@Module({
  imports: [HttpModule],
  controllers: [SecurityController],
  providers: [ForwardService, GatewayHeadersBuilder, SecurityService],
})
export class SecurityModule {}
