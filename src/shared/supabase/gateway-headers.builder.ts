import { Injectable } from '@nestjs/common';
import { JwtClaims } from '../types/jwtClaims';

/// Builds the outbound headers for a request relayed to a backend service.
///
/// The incoming `Authorization` header (the Supabase JWT) is forwarded as-is so
/// the backend can read it, and `X-Requester-Id` is stamped from the JWT subject
/// so the backend knows who is acting. Hop-by-hop / body-derived headers are
/// dropped — the outbound request recomputes them (a stale `content-length`
/// truncates the body).
@Injectable()
export class GatewayHeadersBuilder {
  static readonly REQUESTER_ID_HEADER = 'X-Requester-Id';
  static readonly EXCLUDED_HEADERS = ['host', 'content-length', 'connection'];

  build(
    incoming: Record<string, any>,
    payload: JwtClaims,
  ): Record<string, any> {
    const headers: Record<string, any> = {};
    for (const [key, value] of Object.entries(incoming ?? {})) {
      if (!GatewayHeadersBuilder.EXCLUDED_HEADERS.includes(key.toLowerCase())) {
        headers[key] = value;
      }
    }
    headers[GatewayHeadersBuilder.REQUESTER_ID_HEADER] = payload.sub;
    return headers;
  }
}
