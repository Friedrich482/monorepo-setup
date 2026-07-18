import { EnvModule } from "@/env/env.module";
import { EnvService } from "@/env/env.service";
import { TrpcService } from "@/trpc/trpc.service";
import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AuthRouter } from "./auth.router";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        global: true,
        secret: envService.get("JWT_SECRET"),
        signOptions: { expiresIn: "2d" },
      }),
      inject: [EnvService],
    }),
  ],

  providers: [AuthService, AuthRouter, TrpcService, EnvService],
  exports: [AuthRouter, AuthService],
})
export class AuthModule {}
