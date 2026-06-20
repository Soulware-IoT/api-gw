import { Injectable } from '@nestjs/common';
import { ForwardService } from '../../shared/supabase/forward.service';

@Injectable()
export class InternalControlService {
  constructor(private readonly forwardService: ForwardService) {}

  forwardRequest(req: any): Promise<any> {
    return this.forwardService.forward(req);
  }
}
