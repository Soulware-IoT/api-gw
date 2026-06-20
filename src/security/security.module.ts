import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupabaseConfigService } from '../shared/supabase/supabase-config.service';
import { ForwardService } from '../shared/supabase/forward.service';
import { GatewayHeadersBuilder } from '../shared/supabase/gateway-headers.builder';
import { SecurityService } from './service/security.service';
import { AuthenticationGuard } from '../shared/guards/authentication.guard';
import { AdminGuard } from '../shared/guards/admin.guard';
import { SecurityLieutenantGuard } from './guards/security-lieutenant.guard';
import { SecurityAssigneeGuard } from './guards/security-assignee.guard';
import { SecurityController } from './controllers/security.controller';

@Module({
  imports: [HttpModule],
  controllers: [SecurityController],
  providers: [
    ForwardService,
    GatewayHeadersBuilder,
    SecurityService,
    SupabaseConfigService,
    AuthenticationGuard,
    AdminGuard,
    SecurityLieutenantGuard,
    SecurityAssigneeGuard,
  ],
})
export class SecurityModule {}
