/// Route templates for the Subscriptions bounded context (NestJS path syntax).
export const SubscriptionRoutes = {
  /// GET — the organization's active subscription.
  subscription: 'organizations/:organizationId/subscription',
  /// POST — replace the subscription plan.
  subscriptionPlan: 'organizations/:organizationId/subscription/plan',
  /// POST — lifecycle transitions (owner only).
  subscriptionDowngrade: 'organizations/:organizationId/subscription/downgrade',
  subscriptionResume: 'organizations/:organizationId/subscription/resume',
} as const;
