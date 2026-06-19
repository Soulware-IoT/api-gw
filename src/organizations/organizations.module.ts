import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupabaseConfigService } from '../shared/supabase/supabase-config.service';
import { ForwardService } from '../shared/supabase/forward.service';
import { OrganizationsService } from './service/organizations.service';
import { AuthenticationGuard } from '../shared/guards/authentication.guard';
import { AdminGuard } from '../shared/guards/admin.guard';
import { OrganizationMemberGuard } from '../shared/guards/organization-member.guard';
import { OrganizationController } from './controllers/organization.controller';

@Module({
  imports: [HttpModule],
  controllers: [OrganizationController],
  providers: [
    ForwardService,
    OrganizationsService,
    SupabaseConfigService,
    AuthenticationGuard,
    AdminGuard,
    OrganizationMemberGuard,
  ],
})
export class OrganizationsModule {}
