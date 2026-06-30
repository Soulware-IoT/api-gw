/// Route templates for the Subscriptions bounded context (NestJS path syntax).
export const SubscriptionRoutes = {
  /// GET — the organization's active subscription.
  subscription: 'organizations/:organizationId/subscription',
  /// POST — replace the subscription plan.
  subscriptionPlan: 'organizations/:organizationId/subscription/plan',
  /// POST — lifecycle transitions (owner only).
  subscriptionSuspend: 'organizations/:organizationId/subscription/suspend',
  subscriptionCancel: 'organizations/:organizationId/subscription/cancel',
  subscriptionReactivate: 'organizations/:organizationId/subscription/reactivate',
} as const;
