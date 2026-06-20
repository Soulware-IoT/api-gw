/// Route templates for the Internal Control bounded context (NestJS path syntax).
export const InternalControlRoutes = {
  /// POST create + GET list — control processes of an organization.
  controlProcesses: 'organizations/:organizationId/control-processes',
  /// GET / PATCH a single control process.
  controlProcess: 'control-processes/:id',
  /// POST create + GET list — formats of a control process.
  processFormats: 'control-processes/:processId/formats',
  /// GET a single format by id.
  format: 'formats/:id',
} as const;
