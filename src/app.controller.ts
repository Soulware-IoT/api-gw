import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './shared/auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /// Liveness probe for deploy platforms and uptime checks — no auth, no
  /// backend round-trip (it reports the gateway process only).
  @Public()
  @Get('health')
  health(): { status: string } {
    return { status: 'ok' };
  }
}
