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
  /// PUT — define/replace the fields (structure) of a format.
  formatFields: 'formats/:id/fields',
  /// POST — format lifecycle transitions.
  formatActivate: 'formats/:id/activate',
  formatSuspend: 'formats/:id/suspend',
  formatResume: 'formats/:id/resume',
  formatCease: 'formats/:id/cease',
  /// GET list + POST create — registries (filled records) of a format.
  formatRegistries: 'formats/:formatId/registries',
  /// GET a single registry by id.
  registry: 'registries/:id',
} as const;
