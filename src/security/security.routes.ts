/// Route templates for the Security bounded context (NestJS path syntax).
/// Centralized so every Security endpoint follows a consistent nomenclature.
export const SecurityRoutes = {
  /// POST claim + GET list — IoT devices owned by an organization.
  organizationDevices: 'organizations/:organizationId/iot-devices',
  /// GET + PATCH a single IoT device by id.
  device: 'iot-devices/:id',
  /// POST servo command to a specific IoT device.
  deviceServo: 'iot-devices/:id/servo',
  /// POST claim + GET by organization — the org's edge device.
  organizationEdgeDevice: 'organizations/:organizationId/edge-device',
  /// GET + PATCH a single edge device by id.
  edgeDevice: 'edge-device/:id',
} as const;
