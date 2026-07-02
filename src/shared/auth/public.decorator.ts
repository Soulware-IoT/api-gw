import { SetMetadata } from '@nestjs/common';

/// Marks a route as public so the global SupabaseAuthGuard skips it
/// (e.g. the health probe, which carries no user identity).
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
