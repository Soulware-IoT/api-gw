/// Route templates for the Profiles bounded context (NestJS path syntax).
export const ProfileRoutes = {
  /// GET by email (query `?email=`) — collection root.
  profiles: 'profiles',
  /// GET / PATCH a single profile by id.
  profile: 'profiles/:id',
} as const;
