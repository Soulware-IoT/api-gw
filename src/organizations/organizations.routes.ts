/// Route templates for the Organizations bounded context (NestJS path syntax).
export const OrganizationRoutes = {
  /// POST create — collection root.
  organizations: 'organizations',
  /// GET / PATCH / DELETE a single organization.
  organization: 'organizations/:organizationId',
  /// GET list members of an organization.
  members: 'organizations/:organizationId/members',
  /// GET / DELETE a single member.
  member: 'organizations/:organizationId/members/:memberId',
  /// PUT a member's permissions.
  memberPermissions: 'organizations/:organizationId/members/:memberId/permissions',
  /// GET list + POST create invitations of an organization.
  invitations: 'organizations/:organizationId/invitations',
  /// GET invitations addressed to the authenticated user (identity from JWT).
  myInvitations: 'invitations',
  /// GET a single invitation by id.
  invitation: 'invitations/:id',
  /// POST accept an invitation.
  invitationAccept: 'invitations/:id/accept',
  /// POST decline an invitation.
  invitationDecline: 'invitations/:id/decline',
} as const;
