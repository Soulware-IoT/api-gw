import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupabaseConfigService } from '../shared/supabase/supabase-config.service';
import { ForwardService } from '../shared/supabase/forward.service';
import { ProfilesService } from './service/profiles.service';
import { AuthenticationGuard } from '../shared/guards/authentication.guard';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProfileController],
  providers: [
    ForwardService,
    ProfilesService,
    SupabaseConfigService,
    AuthenticationGuard,
  ],
})
export class ProfilesModule {}
