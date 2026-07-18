import * as bcrypt from "bcrypt";

import { JWTDtoType } from "@/common/dto";
import { UsersService } from "@/users/users.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TRPCError } from "@trpc/server";

import { LoginDtoType, RegisterDtoType } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDtoType) {
    const { username, email, password } = registerDto;

    const createdUser = await this.usersService.create({
      email,
      username,
      password,
    });

    const payload: Pick<JWTDtoType, "sub"> = { sub: createdUser.id };
    const token = await this.jwtService.signAsync(payload);

    return { accessToken: token };
  }

  async login(loginDto: LoginDtoType) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail({ email });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );
    if (!isPasswordCorrect) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect password",
      });
    }

    const payload: Pick<JWTDtoType, "sub"> = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
    };
  }
}
