import { Controller, Delete, Get, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { SecurityLieutenantGuard } from '../guards/security-lieutenant.guard';
import { SecurityAssigneeGuard } from '../guards/security-assignee.guard';
import { SecurityService } from "../service/security.service";
import { SecurityRoutes } from '../security.routes';

@Controller()
@UseGuards(AuthenticationGuard)
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post(SecurityRoutes.organizationDevices)
  @UseGuards(AdminGuard)
  register(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get(SecurityRoutes.organizationDevices)
  @UseGuards(SecurityLieutenantGuard)
  getDevices(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get(SecurityRoutes.device)
  @UseGuards(SecurityAssigneeGuard)
  getDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  // No organizationId in the path — the client must pass ?organizationId= so
  // the guard can resolve the membership (same as GET by id above).
  @Patch(SecurityRoutes.device)
  @UseGuards(SecurityLieutenantGuard)
  updateDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Post(SecurityRoutes.organizationEdgeDevice)
  @UseGuards(AdminGuard)
  claimEdgeDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get(SecurityRoutes.organizationEdgeDevice)
  @UseGuards(SecurityLieutenantGuard)
  getEdgeDeviceByOrganization(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get(SecurityRoutes.edgeDevice)
  @UseGuards(SecurityAssigneeGuard)
  getEdgeDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  // No organizationId in the path — the client must pass ?organizationId= so
  // the guard can resolve the membership (same as GET by id above).
  @Patch(SecurityRoutes.edgeDevice)
  @UseGuards(SecurityLieutenantGuard)
  updateEdgeDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }
}