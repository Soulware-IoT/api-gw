import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ForwardService } from '../shared/forward/forward.service';
import { GatewayHeadersBuilder } from '../shared/forward/gateway-headers.builder';
import { ProfilesService } from './service/profiles.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProfileController],
  providers: [ForwardService, GatewayHeadersBuilder, ProfilesService],
})
export class ProfilesModule {}
