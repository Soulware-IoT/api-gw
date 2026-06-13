import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InternalControlService } from './internal-control.service';
import { InternalControlController } from './internal-control.controller';

@Module({
  imports: [HttpModule],
  providers: [InternalControlService],
  controllers: [InternalControlController],
  exports: [InternalControlService],
})
export class InternalControlModule {}