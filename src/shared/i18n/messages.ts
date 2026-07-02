/// Localized message catalog for the gateway's own errors.
///
/// Backend errors already arrive localized — the backend resolves the locale
/// from `Accept-Language` and the gateway forwards that header verbatim.
/// Domain errors are owned by the backend; the gateway itself only produces
/// edge-level messages: upstream unavailable/timeout when the backend cannot
/// be reached, and the auth-guard rejections (missing or invalid JWT).
export type MessageKey =
  | 'gateway.upstream_unavailable'
  | 'gateway.upstream_timeout'
  | 'gateway.missing_token'
  | 'gateway.invalid_token';

export type SupportedLanguage = 'en' | 'es';

export const MESSAGES: Record<SupportedLanguage, Record<MessageKey, string>> = {
  en: {
    'gateway.upstream_unavailable': 'Upstream service unavailable',
    'gateway.upstream_timeout': 'Upstream service timed out',
    'gateway.missing_token': 'Authentication required',
    'gateway.invalid_token': 'Invalid or expired credentials',
  },
  es: {
    'gateway.upstream_unavailable': 'Servicio no disponible',
    'gateway.upstream_timeout': 'El servicio tardó demasiado en responder',
    'gateway.missing_token': 'Autenticación requerida',
    'gateway.invalid_token': 'Credenciales inválidas o expiradas',
  },
};
