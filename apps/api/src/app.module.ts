import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { envSchema } from "./env";
import { EnvModule } from "./env/env.module";
import { TrpcModule } from "./trpc/trpc.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    TrpcModule,
    EnvModule,
    DrizzleModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
