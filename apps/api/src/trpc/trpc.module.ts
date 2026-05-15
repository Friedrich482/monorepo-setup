import { EnvService } from "@/env/env.service";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { TrpcController } from "./trpc.controller";
import { TrpcService } from "./trpc.service";

@Module({
  controllers: [TrpcController],
  providers: [TrpcService, JwtService, EnvService],
})
export class TrpcModule {}
