import { Controller, Delete, ForbiddenException, Get, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../shared/guards/authentication.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { OrganizationMemberGuard } from '../../shared/guards/organization-member.guard';
import { OrganizationsService } from '../service/organizations.service';
import { OrganizationRoutes } from '../organizations.routes';
import { JwtClaims } from '../../shared/types/jwtClaims';
import { translate } from '../../shared/i18n/translate';

@Controller()
@UseGuards(AuthenticationGuard)
export class OrganizationController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  // profiles

  @Get(OrganizationRoutes.profileInvitations)
  getInvitationByProfile(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  // No org context yet — just auth

  /// `GET /organizations?profileId=` — organizations the caller belongs to.
  /// Not org-scoped (no membership guard yet), so we harden it here: a user may
  /// only list their *own* organizations (the backend doesn't enforce this).
  @Get(OrganizationRoutes.organizations)
  listMyOrganizations(@Req() req: any) {
    const payload: JwtClaims = req.user;
    if (req.query?.profileId !== payload.sub) {
      throw new ForbiddenException(
        translate('org.profile_mismatch', req.headers?.['accept-language']),
      );
    }
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

  // Org context — member read

  @Get(OrganizationRoutes.organization)
  @UseGuards(OrganizationMemberGuard)
  getOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.invitations)
  @UseGuards(OrganizationMemberGuard)
  listInvitations(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.members)
  @UseGuards(OrganizationMemberGuard)
  listMembers(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Get(OrganizationRoutes.member)
  @UseGuards(OrganizationMemberGuard)
  getMember(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  // Org context — admin only

  @Patch(OrganizationRoutes.organization)
  @UseGuards(AdminGuard)
  updateOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Delete(OrganizationRoutes.organization)
  @UseGuards(AdminGuard)
  deleteOrganization(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Post(OrganizationRoutes.invitations)
  @UseGuards(AdminGuard)
  invite(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Delete(OrganizationRoutes.member)
  @UseGuards(AdminGuard)
  removeMember(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }

  @Put(OrganizationRoutes.memberPermissions)
  @UseGuards(AdminGuard)
  updatePermissions(@Req() req: any) {
    return this.organizationsService.forwardRequest(req);
  }
}
