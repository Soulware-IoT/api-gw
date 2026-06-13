import { BoundedContext } from "./boundedContext";
import { Role } from "./role";

export interface OrganizationRoles {
  member_id: string;
  organization_id: string;
  permissions: Record<BoundedContext, Role>;
}
