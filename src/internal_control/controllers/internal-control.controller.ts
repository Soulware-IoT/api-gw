import { Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { InternalControlLieutenantGuard } from '../guards/internal-control-lieutenant.guard';
import { InternalControlAssigneeGuard } from '../guards/internal-control-assignee.guard';
import { InternalControlService } from '../service/internal-control.service';

@Controller()
@UseGuards(AuthenticationGuard)
export class InternalControlController {
  constructor(private readonly internalControlService: InternalControlService) {}

  // --- Control Processes ---

  @Post('organizations/:organizationId/control-processes')
  @UseGuards(AdminGuard)
  createControlProcess(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get('organizations/:organizationId/control-processes')
  @UseGuards(InternalControlLieutenantGuard)
  listControlProcesses(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get('control-processes/:id')
  @UseGuards(InternalControlAssigneeGuard)
  getControlProcessById(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Patch('control-processes/:id')
  @UseGuards(AdminGuard)
  renameControlProcess(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  // --- Control Formats ---

  @Post('control-processes/:processId/formats')
  @UseGuards(AdminGuard)
  createControlFormat(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get('control-processes/:processId/formats')
  @UseGuards(InternalControlLieutenantGuard)
  listControlFormats(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get('formats/:id')
  @UseGuards(InternalControlAssigneeGuard)
  getControlFormatById(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }
}
