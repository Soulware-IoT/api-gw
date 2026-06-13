import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';

@Module({
  imports: [HttpModule],
  providers: [SecurityService],
  controllers: [SecurityController],
  exports: [SecurityService],
})
export class SecurityModule {}