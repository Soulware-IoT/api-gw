import { Controller, Delete, Get, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { SecurityLieutenantGuard } from '../guards/security-lieutenant.guard';
import { SecurityAssigneeGuard } from '../guards/security-assignee.guard';
import { SecurityService } from "../service/security.service";

@Controller()
@UseGuards(AuthenticationGuard)
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('organizations/:organizationId/devices')
  @UseGuards(AdminGuard)
  register(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get('organizations/:organizationId/devices')
  @UseGuards(SecurityLieutenantGuard)
  getDevices(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get('devices/:deviceId')
  @UseGuards(SecurityAssigneeGuard)
  getDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Post('organizations/:organizationId/edge-device')
  @UseGuards(AdminGuard)
  claimEdgeDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get('organizations/:organizationId/edge-device')
  @UseGuards(SecurityLieutenantGuard)
  getEdgeDeviceByOrganization(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get('edge-devices/:id')
  @UseGuards(SecurityAssigneeGuard)
  getEdgeDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }
}