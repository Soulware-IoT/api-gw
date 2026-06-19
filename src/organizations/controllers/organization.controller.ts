import { Controller, Delete, Get, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { OrganizationMemberGuard } from '../../shared/guards/organization-member.guard';
import { OrganizationsService } from '../service/organizations.service';

@Controller()
@UseGuards(AuthenticationGuard)
export class OrganizationController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  // profiles

  @Get('profiles/:id/invitations')
  getInvitationByProfile(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  // No org context yet — just auth

  @Post('organizations')
  @UseGuards(AdminGuard)
  create(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get('invitations/:id')
  getInvitation(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Post('invitations/:id/accept')
  acceptInvitation(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Post('invitations/:id/decline')
  declineInvitation(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  // Org context — member read

  @Get('organizations/:organizationId')
  @UseGuards(OrganizationMemberGuard)
  getOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get('organizations/:organizationId/invitations')
  @UseGuards(OrganizationMemberGuard)
  listInvitations(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get('organizations/:organizationId/members')
  @UseGuards(OrganizationMemberGuard)
  listMembers(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get('organizations/:organizationId/members/:memberId')
  @UseGuards(OrganizationMemberGuard)
  getMember(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  // Org context — admin only

  @Patch('organizations/:organizationId')
  @UseGuards(AdminGuard)
  updateOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Delete('organizations/:organizationId')
  @UseGuards(AdminGuard)
  deleteOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Post('organizations/:organizationId/invitations')
  @UseGuards(AdminGuard)
  invite(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Delete('organizations/:organizationId/members/:memberId')
  @UseGuards(AdminGuard)
  removeMember(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Put('organizations/:organizationId/members/:memberId/permissions')
  @UseGuards(AdminGuard)
  updatePermissions(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }
}
