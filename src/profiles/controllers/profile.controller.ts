import { Controller, Get, Patch, Req } from '@nestjs/common';
import { ProfilesService } from '../service/profiles.service';
import { ProfileRoutes } from '../profiles.routes';

/// Pure forwarder: authentication now lives in the backend.
@Controller()
export class ProfileController {
  constructor(private readonly profilesService: ProfilesService) {}

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
