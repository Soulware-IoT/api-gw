import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { SecurityModule } from './security/security.module';
import { InternalControlModule } from './internal_control/internal-control.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SupabaseAuthGuard } from './shared/auth/supabase-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrganizationsModule,
    SecurityModule,
    InternalControlModule,
    ProfilesModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Every route requires a valid Supabase JWT unless marked @Public().
    // The backend re-validates: this is edge-level defense in depth.
    { provide: APP_GUARD, useClass: SupabaseAuthGuard },
  ],
})
export class AppModule {}
