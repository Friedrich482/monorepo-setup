import { EnvService } from "@/env/env.service";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Module({
  providers: [TrpcService, TrpcRouter, JwtService, EnvService],
})
export class TrpcModule {}
