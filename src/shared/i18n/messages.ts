/// Localized message catalog for the gateway's own errors (forward failures only).
///
/// Backend errors already arrive localized — the backend resolves the locale
/// from `Accept-Language` and the gateway forwards that header verbatim.
/// Authentication, authorization, and all domain errors are now owned by the
/// backend; the only message the gateway itself produces is an upstream-unavailable
/// 502 when the backend is unreachable.
export type MessageKey = 'gateway.upstream_unavailable';

export type SupportedLanguage = 'en' | 'es';

export const MESSAGES: Record<SupportedLanguage, Record<MessageKey, string>> = {
  en: {
    'gateway.upstream_unavailable': 'Upstream service unavailable',
  },
  es: {
    'gateway.upstream_unavailable': 'Servicio no disponible',
  },
};
