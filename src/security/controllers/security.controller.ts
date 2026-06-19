import { Controller, Delete, Get, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { SecurityService } from "../service/security.service";

@Controller()
@UseGuards(AuthenticationGuard)
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('organizations/:organizationId/devices')
  register(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get('organizations/:organizationId/devices')
  getDevices(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get('devices/:deviceId')
  getDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }
}