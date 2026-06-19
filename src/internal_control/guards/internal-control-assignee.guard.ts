import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { OrganizationRolesExtractor } from '../../shared/guards/organization-roles-extractor';
import { BoundedContext } from '../../shared/types/boundedContext';
import { JwtClaims } from '../../shared/types/jwtClaims';

@Injectable()
export class InternalControlAssigneeGuard extends OrganizationRolesExtractor implements CanActivate {
  private readonly boundedContext: BoundedContext = 'internal_control';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload: JwtClaims = request.user;
    const organizationId: string = this.extractOrganizationId(request);

    const membership = this.extractClaims(payload, organizationId);
    if (!membership) {
      throw new ForbiddenException('Not a member of this organization');
    }

    if (!this.hasMinimumRole(membership.permissions[this.boundedContext], 'assignee')) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
