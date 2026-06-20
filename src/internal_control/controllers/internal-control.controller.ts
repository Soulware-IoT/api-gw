import { Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { InternalControlLieutenantGuard } from '../guards/internal-control-lieutenant.guard';
import { InternalControlAssigneeGuard } from '../guards/internal-control-assignee.guard';
import { InternalControlService } from '../service/internal-control.service';
import { InternalControlRoutes } from '../internal-control.routes';

@Controller()
@UseGuards(AuthenticationGuard)
export class InternalControlController {
  constructor(private readonly internalControlService: InternalControlService) {}

  // --- Control Processes ---

  @Post(InternalControlRoutes.controlProcesses)
  @UseGuards(AdminGuard)
  createControlProcess(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.controlProcesses)
  @UseGuards(InternalControlLieutenantGuard)
  listControlProcesses(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.controlProcess)
  @UseGuards(InternalControlAssigneeGuard)
  getControlProcessById(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Patch(InternalControlRoutes.controlProcess)
  @UseGuards(AdminGuard)
  renameControlProcess(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  // --- Control Formats ---

  @Post(InternalControlRoutes.processFormats)
  @UseGuards(AdminGuard)
  createControlFormat(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.processFormats)
  @UseGuards(InternalControlLieutenantGuard)
  listControlFormats(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.format)
  @UseGuards(InternalControlAssigneeGuard)
  getControlFormatById(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }
}
