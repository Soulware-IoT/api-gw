import { Injectable } from "@nestjs/common";
import { ForwardService } from "../../shared/forward/forward.service";

@Injectable()
export class SecurityService {
  constructor(private readonly forwardService: ForwardService) {}

  forwardRequest(req: any): Promise<any> {
    return this.forwardService.forward(req);
  }

  forwardStreamRequest(req: any, res: any): Promise<void> {
    return this.forwardService.forwardStream(req, res);
  }
}