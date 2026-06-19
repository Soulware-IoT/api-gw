interface ExecutionContext {
  switchToHttp(): {
    getRequest(): any;
  };
}

interface CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}

class ForbiddenException extends Error {
  status = 403;

  constructor(message?: string) {
    super(message);
    this.name = 'ForbiddenException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

function Injectable(): ClassDecorator {
  return () => {};
}

import { OrganizationRolesExtractor } from '../../shared/guards/organization-roles-extractor';
import { BoundedContext } from '../../shared/types/boundedContext';
import { JwtClaims } from '../../shared/types/jwtClaims';

@Injectable()
export class OrganizationLieutenantGuard extends OrganizationRolesExtractor implements CanActivate {
  private readonly boundedContext: BoundedContext = 'Security';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload: JwtClaims = request.user;
    const organizationId: string = this.extractOrganizationId(request);

    const membership = this.extractClaims(payload, organizationId);
    if (!membership) {
      throw new ForbiddenException('Not a member of this organization');
    }

    if (!this.hasMinimumRole(membership.permissions[this.boundedContext], 'lieutenant')) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
