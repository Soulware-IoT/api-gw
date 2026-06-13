import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { OrganizationRolesExtractor } from './organization-roles-extractor';
import { JwtClaims } from '../types/jwtClaims';

@Injectable()
export class OrganizationMemberGuard extends OrganizationRolesExtractor implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload: JwtClaims = request.user;
    const organizationId: string = this.extractOrganizationId(request);

    const membership = this.extractClaims(payload, organizationId);
    if (!membership) {
      throw new ForbiddenException('Not a member of this organization');
    }

    return true;
  }
}
