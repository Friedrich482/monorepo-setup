import { TrpcService } from "@/trpc/trpc.service";
import { Injectable } from "@nestjs/common";
import {
  LoginSchema as LoginDto,
  RegisterSchema as RegisterDto,
} from "@repo/common/types-schemas";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly authService: AuthService,
  ) {}

  private readonly AUTH_COOKIE_NAME = "auth_token";
  private readonly COOKIE_MAX_AGE = 2 * 24 * 60 * 60 * 1000; // 2 days

  procedures() {
    return {
      auth: this.trpcService.trpc.router({
        register: this.trpcService
          .publicProcedure()
          .input(RegisterDto)
          .mutation(async ({ ctx, input }) => {
            const { accessToken } = await this.authService.register(input);

            // Set the HTTP-only cookie
            ctx.res.cookie(this.AUTH_COOKIE_NAME, accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              maxAge: this.COOKIE_MAX_AGE,
            });
          }),

        login: this.trpcService
          .publicProcedure()
          .input(LoginDto)
          .mutation(async ({ ctx, input }) => {
            const { accessToken } = await this.authService.login(input);

            // Set the HTTP-only cookie
            ctx.res.cookie(this.AUTH_COOKIE_NAME, accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              maxAge: this.COOKIE_MAX_AGE,
            });
          }),

        checkAuthStatus: this.trpcService
          .protectedProcedure()
          .query(async ({ ctx }) =>
            this.authService.checkAuthStatus({ user: ctx.user }),
          ),
      }),
    };
  }
}
