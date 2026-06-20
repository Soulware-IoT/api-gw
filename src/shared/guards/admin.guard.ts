import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtClaims } from '../types/jwtClaims';
import { OrganizationRolesExtractor } from './organization-roles-extractor';
import { translate } from '../i18n/translate';

@Injectable()
export class AdminGuard extends OrganizationRolesExtractor implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload: JwtClaims = request.user;
    const lang: string = request.headers?.['accept-language'];
    const organizationId: string = this.extractOrganizationId(request);

    const membership = this.extractClaims(payload, organizationId);
    if (!membership) {
      throw new ForbiddenException(translate('org.not_member', lang));
    }

    const isAdmin = Object.values(membership.permissions).every(
      (role) => this.hasMinimumRole(role, 'admin'),
    );
    if (!isAdmin) {
      throw new ForbiddenException(translate('org.insufficient_permissions', lang));
    }

    return true;
  }
}
