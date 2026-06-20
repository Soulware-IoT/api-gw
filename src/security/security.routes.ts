/// Route templates for the Security bounded context (NestJS path syntax).
/// Centralized so every Security endpoint follows a consistent nomenclature.
export const SecurityRoutes = {
  /// POST claim + GET list — IoT devices owned by an organization.
  organizationDevices: 'organizations/:organizationId/devices',
  /// GET a single IoT device by id.
  device: 'devices/:deviceId',
  /// POST claim + GET by organization — the org's edge device.
  organizationEdgeDevice: 'organizations/:organizationId/edge-device',
  /// GET a single edge device by id.
  edgeDevice: 'edge-devices/:id',
} as const;
