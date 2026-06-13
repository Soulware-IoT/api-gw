export type Role = 'admin' | 'lieutenant' | 'assignee' | 'none';

export const RoleLevel: Record<Role, number> = {
  admin: 3,
  lieutenant: 2,
  assignee: 1,
  none: 0,
};