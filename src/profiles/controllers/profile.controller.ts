import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { ProfilesService } from '../service/profiles.service';
import { ProfileRoutes } from '../profiles.routes';

@Controller()
@UseGuards(AuthenticationGuard)
export class ProfileController {
  constructor(private readonly profilesService: ProfilesService) {}

  // Profiles are not org-scoped — authentication is the only guard.

  @Get(ProfileRoutes.profiles)
  getByEmail(@Req() req: any) {
    return this.profilesService.forwardRequest(req);
  }

  @Get(ProfileRoutes.profile)
  getById(@Req() req: any) {
    return this.profilesService.forwardRequest(req);
  }

  @Patch(ProfileRoutes.profile)
  updateDetails(@Req() req: any) {
    return this.profilesService.forwardRequest(req);
  }
}
