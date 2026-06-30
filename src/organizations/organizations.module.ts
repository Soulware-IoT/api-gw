import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ForwardService } from '../shared/forward/forward.service';
import { GatewayHeadersBuilder } from '../shared/forward/gateway-headers.builder';
import { OrganizationsService } from './service/organizations.service';
import { OrganizationController } from './controllers/organization.controller';

@Module({
  imports: [HttpModule],
  controllers: [OrganizationController],
  providers: [ForwardService, GatewayHeadersBuilder, OrganizationsService],
})
export class OrganizationsModule {}
