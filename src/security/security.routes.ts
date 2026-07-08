/// Route templates for the Security bounded context (NestJS path syntax).
/// Centralized so every Security endpoint follows a consistent nomenclature.
export const SecurityRoutes = {
  /// POST claim + GET list — IoT devices owned by an organization.
  organizationDevices: 'organizations/:organizationId/iot-devices',
  /// GET + PATCH a single IoT device by id.
  device: 'iot-devices/:id',
  /// POST a start/stop command to a device's servo actuator.
  deviceServo: 'iot-devices/:id/servo',
  /// POST claim + GET by organization — the org's edge device.
  organizationEdgeDevice: 'organizations/:organizationId/edge-device',
  /// GET + PATCH a single edge device by id.
  edgeDevice: 'edge-device/:id',
  /// GET snapshot of every device's online/offline presence.
  organizationDevicesPresence: 'organizations/:organizationId/devices/presence',
  /// GET SSE stream of presence transitions (long-lived).
  organizationDevicesPresenceStream:
    'organizations/:organizationId/devices/presence/stream',
  /// GET SSE stream of live sensor readings (long-lived).
  organizationReadingsStream: 'organizations/:organizationId/readings/stream',
} as const;
