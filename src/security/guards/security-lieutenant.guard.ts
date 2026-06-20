import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { OrganizationRolesExtractor } from '../../shared/guards/organization-roles-extractor';
import { BoundedContext } from '../../shared/types/boundedContext';
import { JwtClaims } from '../../shared/types/jwtClaims';
import { translate } from '../../shared/i18n/translate';

@Injectable()
export class SecurityLieutenantGuard extends OrganizationRolesExtractor implements CanActivate {
  private readonly boundedContext: BoundedContext = 'security';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload: JwtClaims = request.user;
    const lang: string = request.headers?.['accept-language'];
    const organizationId: string = this.extractOrganizationId(request);

    const membership = this.extractClaims(payload, organizationId);
    if (!membership) {
      throw new ForbiddenException(translate('org.not_member', lang));
    }

    if (!this.hasMinimumRole(membership.permissions[this.boundedContext], 'lieutenant')) {
      throw new ForbiddenException(translate('org.insufficient_permissions', lang));
    }

    return true;
  }
}
