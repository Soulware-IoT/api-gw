import { OrganizationRoles } from "./organizationRoles";

export class JwtClaims {
  sub!: string;
  email!: string;
  full_name!: string;
  phone!: string;
  role!: string;
  aud!: string;
  iss!: string;
  iat!: number;
  exp!: number;
  session_id!: string;
  is_anonymous!: boolean;
  aal!: string;
  amr!: { method: string; timestamp: number }[];
  app_metadata!: { provider: string; providers: string[] };
  user_metadata!: {
    email: string;
    email_verified: boolean;
    full_name: string;
    phone_verified: boolean;
    sub: string;
  };
  organizations!: OrganizationRoles[];
}
