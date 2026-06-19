import { Injectable } from '@nestjs/common';
import { ForwardService } from '../../shared/supabase/forward.service';

@Injectable()
export class OrganizationsService {
  constructor(private readonly forwardService: ForwardService) {}

  forwardRequest(req: any): Promise<any> {
    return this.forwardService.forward(req, 'ORGANIZATIONS_SERVICE_URL');
  }
}
