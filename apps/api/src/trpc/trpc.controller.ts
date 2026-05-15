import { Controller } from "@nestjs/common";

import { TrpcService } from "./trpc.service";

@Controller("trpc")
export class TrpcController {
  constructor(private readonly trpcService: TrpcService) {}
}
