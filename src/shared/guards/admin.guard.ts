import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtClaims } from '../types/jwtClaims';
import { OrganizationRolesExtractor } from './organization-roles-extractor';

@Injectable()
export class AdminGuard extends OrganizationRolesExtractor implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload: JwtClaims = request.user;
    const organizationId: string = this.extractOrganizationId(request);

    const membership = this.extractClaims(payload, organizationId);
    if (!membership) {
      throw new ForbiddenException('Not a member of this organization');
    }

    const isAdmin = Object.values(membership.permissions).every(
      (role) => this.hasMinimumRole(role, 'admin'),
    );
    if (!isAdmin) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
