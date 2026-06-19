import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { ProfilesService } from '../service/profiles.service';

@Controller()
@UseGuards(AuthenticationGuard)
export class ProfileController {
  constructor(private readonly profilesService: ProfilesService) {}

  // Profiles are not org-scoped — authentication is the only guard.

  @Get('profiles')
  getByEmail(@Req() req: any) {
    return this.profilesService.forwardRequest(req);
  }

  @Get('profiles/:id')
  getById(@Req() req: any) {
    return this.profilesService.forwardRequest(req);
  }

  @Patch('profiles/:id')
  updateDetails(@Req() req: any) {
    return this.profilesService.forwardRequest(req);
  }
}
