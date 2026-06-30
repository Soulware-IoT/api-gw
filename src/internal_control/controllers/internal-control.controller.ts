import { Controller, Get, Patch, Post, Put, Req } from '@nestjs/common';
import { InternalControlService } from '../service/internal-control.service';
import { InternalControlRoutes } from '../internal-control.routes';

/// Pure forwarder: authentication and authorization now live in the backend.
@Controller()
export class InternalControlController {
  constructor(private readonly internalControlService: InternalControlService) {}

  // --- Control Processes ---

  @Post(InternalControlRoutes.controlProcesses)
  createControlProcess(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.controlProcesses)
  listControlProcesses(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.controlProcess)
  getControlProcessById(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Patch(InternalControlRoutes.controlProcess)
  renameControlProcess(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  // --- Control Formats ---

  @Post(InternalControlRoutes.processFormats)
  createControlFormat(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.processFormats)
  listControlFormats(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.format)
  getControlFormatById(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Put(InternalControlRoutes.formatFields)
  defineControlFormatFields(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  // --- Control Format lifecycle ---

  @Post(InternalControlRoutes.formatActivate)
  activateControlFormat(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Post(InternalControlRoutes.formatSuspend)
  suspendControlFormat(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Post(InternalControlRoutes.formatResume)
  resumeControlFormat(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Post(InternalControlRoutes.formatCease)
  ceaseControlFormat(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  // --- Registries (filled records) ---

  @Get(InternalControlRoutes.formatRegistries)
  listFormatRegistries(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Post(InternalControlRoutes.formatRegistries)
  createFormatRegistry(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }

  @Get(InternalControlRoutes.registry)
  getRegistryById(@Req() req: any) {
    return this.internalControlService.forwardRequest(req);
  }
}
