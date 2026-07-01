import { Controller, Get, Post, Req } from '@nestjs/common';
import { SubscriptionsService } from '../service/subscriptions.service';
import { SubscriptionRoutes } from '../subscriptions.routes';

/// Pure forwarder: authentication and authorization live in the backend.
@Controller()
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get(SubscriptionRoutes.subscription)
  getSubscription(@Req() req: any) {
    return this.subscriptionsService.forwardRequest(req);
  }

  @Post(SubscriptionRoutes.subscriptionPlan)
  changePlan(@Req() req: any) {
    return this.subscriptionsService.forwardRequest(req);
  }

  @Post(SubscriptionRoutes.subscriptionDowngrade)
  downgrade(@Req() req: any) {
    return this.subscriptionsService.forwardRequest(req);
  }

  @Post(SubscriptionRoutes.subscriptionResume)
  resume(@Req() req: any) {
    return this.subscriptionsService.forwardRequest(req);
  }
}
