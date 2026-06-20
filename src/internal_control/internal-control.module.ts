import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupabaseConfigService } from '../shared/supabase/supabase-config.service';
import { ForwardService } from '../shared/supabase/forward.service';
import { GatewayHeadersBuilder } from '../shared/supabase/gateway-headers.builder';
import { InternalControlService } from './service/internal-control.service';
import { AuthenticationGuard } from '../shared/guards/authentication.guard';
import { AdminGuard } from '../shared/guards/admin.guard';
import { OrganizationMemberGuard } from '../shared/guards/organization-member.guard';
import { InternalControlLieutenantGuard } from './guards/internal-control-lieutenant.guard';
import { InternalControlAssigneeGuard } from './guards/internal-control-assignee.guard';
import { InternalControlController } from './controllers/internal-control.controller';

@Module({
  imports: [HttpModule],
  controllers: [InternalControlController],
  providers: [
    ForwardService,
    GatewayHeadersBuilder,
    InternalControlService,
    SupabaseConfigService,
    AuthenticationGuard,
    AdminGuard,
    OrganizationMemberGuard,
    InternalControlLieutenantGuard,
    InternalControlAssigneeGuard,
  ],
})
export class InternalControlModule {}