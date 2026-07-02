import { Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { SecurityService } from '../service/security.service';
import { SecurityRoutes } from '../security.routes';

/// Pure forwarder: authentication and authorization now live in the backend.
@Controller()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post(SecurityRoutes.organizationDevices)
  register(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get(SecurityRoutes.organizationDevices)
  getDevices(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get(SecurityRoutes.device)
  getDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Patch(SecurityRoutes.device)
  updateDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Post(SecurityRoutes.organizationEdgeDevice)
  claimEdgeDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get(SecurityRoutes.organizationEdgeDevice)
  getEdgeDeviceByOrganization(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Get(SecurityRoutes.edgeDevice)
  getEdgeDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }

  @Patch(SecurityRoutes.edgeDevice)
  updateEdgeDevice(@Req() req: any) {
    return this.securityService.forwardRequest(req);
  }
}
