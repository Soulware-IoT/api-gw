import { MESSAGES, MessageKey, SupportedLanguage } from './messages';

const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/// Picks the response language from the incoming `Accept-Language` header,
/// mirroring the backend's behavior: Spanish when the first tag is `es*`,
/// English otherwise (the default fallback bundle).
function resolveLanguage(acceptLanguage?: string): SupportedLanguage {
  if (!acceptLanguage) return DEFAULT_LANGUAGE;

  const primaryTag = acceptLanguage
    .split(',')[0]
    .trim()
    .toLowerCase();

  return primaryTag.startsWith('es') ? 'es' : DEFAULT_LANGUAGE;
}

/// Translates one of the gateway's own error messages into the language
/// requested via `Accept-Language` (header value as received from the client).
export function translate(key: MessageKey, acceptLanguage?: string): string {
  const language = resolveLanguage(acceptLanguage);
  return MESSAGES[language][key];
}
