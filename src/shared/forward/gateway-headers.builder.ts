import { Injectable } from '@nestjs/common';

/// Builds the outbound headers for a request relayed to a backend service.
///
/// The gateway is a pure forwarder: the incoming `Authorization` header (the
/// Supabase JWT) and `Accept-Language` are passed through as-is so the backend
/// can validate the token, resolve identity from its `sub` claim, and localize
/// errors. Hop-by-hop / body-derived headers are dropped — the outbound request
/// recomputes them (a stale `content-length` truncates the body).
///
/// NOTE: identity is no longer stamped here. `X-Requester-Id` used to be derived
/// from the (gateway-validated) JWT, but identity now lives in the backend,
/// which reads it from the validated token directly.
@Injectable()
export class GatewayHeadersBuilder {
  static readonly EXCLUDED_HEADERS = ['host', 'content-length', 'connection'];

  build(incoming: Record<string, any>): Record<string, any> {
    const headers: Record<string, any> = {};
    for (const [key, value] of Object.entries(incoming ?? {})) {
      if (!GatewayHeadersBuilder.EXCLUDED_HEADERS.includes(key.toLowerCase())) {
        headers[key] = value;
      }
    }
    return headers;
  }
}
