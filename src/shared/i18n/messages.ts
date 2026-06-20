/// Localized message catalog for the gateway's *own* errors (guards + forward).
///
/// Backend errors already arrive localized — the backend resolves the locale
/// from `Accept-Language` (`spring.mvc.locale-resolver=accept-header`) and the
/// gateway forwards that header verbatim. These keys cover only the messages the
/// gateway itself produces, mirroring the backend's two-language setup
/// (`messages.properties` / `messages_es.properties`).
export type MessageKey =
  | 'auth.no_header'
  | 'auth.invalid_format'
  | 'auth.no_token'
  | 'auth.invalid_token'
  | 'org.not_member'
  | 'org.insufficient_permissions'
  | 'org.id_required'
  | 'org.profile_mismatch'
  | 'gateway.upstream_unavailable';

export type SupportedLanguage = 'en' | 'es';

export const MESSAGES: Record<SupportedLanguage, Record<MessageKey, string>> = {
  en: {
    'auth.no_header': 'No authorization header provided',
    'auth.invalid_format': 'Invalid authorization format',
    'auth.no_token': 'No auth token provided',
    'auth.invalid_token': 'Invalid or expired token',
    'org.not_member': 'Not a member of this organization',
    'org.insufficient_permissions': 'Insufficient permissions',
    'org.id_required': 'organizationId is required',
    'org.profile_mismatch': 'You can only list your own organizations',
    'gateway.upstream_unavailable': 'Upstream service unavailable',
  },
  es: {
    'auth.no_header': 'No se proporcionó la cabecera de autorización',
    'auth.invalid_format': 'Formato de autorización inválido',
    'auth.no_token': 'No se proporcionó el token de autenticación',
    'auth.invalid_token': 'Token inválido o expirado',
    'org.not_member': 'No eres miembro de esta organización',
    'org.insufficient_permissions': 'Permisos insuficientes',
    'org.id_required': 'organizationId es obligatorio',
    'org.profile_mismatch': 'Solo puedes listar tus propias organizaciones',
    'gateway.upstream_unavailable': 'Servicio no disponible',
  },
};
