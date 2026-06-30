import { Controller, Delete, Get, Patch, Post, Put, Req } from '@nestjs/common';
import { OrganizationsService } from '../service/organizations.service';
import { OrganizationRoutes } from '../organizations.routes';

/// Pure forwarder: authentication and authorization now live in the backend.
/// The `listMyOrganizations` self-check (caller may only list their own orgs)
/// also moves to the backend, which resolves identity from the validated JWT.
@Controller()
export class OrganizationController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get(OrganizationRoutes.profileInvitations)
  getInvitationByProfile(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.organizations)
  listMyOrganizations(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Post(OrganizationRoutes.organizations)
  create(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.invitation)
  getInvitation(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Post(OrganizationRoutes.invitationAccept)
  acceptInvitation(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Post(OrganizationRoutes.invitationDecline)
  declineInvitation(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.organization)
  getOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.invitations)
  listInvitations(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.members)
  listMembers(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.member)
  getMember(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Patch(OrganizationRoutes.organization)
  updateOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Delete(OrganizationRoutes.organization)
  deleteOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Post(OrganizationRoutes.invitations)
  invite(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Delete(OrganizationRoutes.member)
  removeMember(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Put(OrganizationRoutes.memberPermissions)
  updatePermissions(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }
}
