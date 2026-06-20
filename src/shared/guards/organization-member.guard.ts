import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { OrganizationRolesExtractor } from './organization-roles-extractor';
import { JwtClaims } from '../types/jwtClaims';
import { translate } from '../i18n/translate';

@Injectable()
export class OrganizationMemberGuard extends OrganizationRolesExtractor implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload: JwtClaims = request.user;
    const lang: string = request.headers?.['accept-language'];
    const organizationId: string = this.extractOrganizationId(request);

    const membership = this.extractClaims(payload, organizationId);
    if (!membership) {
      throw new ForbiddenException(translate('org.not_member', lang));
    }

    return true;
  }
}
