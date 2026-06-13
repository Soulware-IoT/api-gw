import { JwtClaims } from '../types/jwtClaims';
import { OrganizationRoles } from '../types/organizationRoles';
import { Role, RoleLevel } from '../types/role';
import { OrganizationIdExtractor } from './organization-id-extractor';

export abstract class OrganizationRolesExtractor extends OrganizationIdExtractor {
  extractClaims(
    payload: JwtClaims,
    organizationId: string,
  ): OrganizationRoles | undefined {
    return payload.organizations.find(
      (org) => org.organization_id === organizationId,
    );
  }

  protected hasMinimumRole(actual: Role, minimum: Role): boolean {
    return RoleLevel[actual] >= RoleLevel[minimum];
  }
}
