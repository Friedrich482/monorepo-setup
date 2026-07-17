import * as bcrypt from "bcrypt";
import { eq, or } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DRIZZLE_ASYNC_PROVIDER } from "@/drizzle/constants";
import { users } from "@/drizzle/schema";
import { Inject, Injectable } from "@nestjs/common";
import { TRPCError } from "@trpc/server";

import { CreateUserDtoType, FindByEmailDtoType } from "./users.dto";

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @Inject(DRIZZLE_ASYNC_PROVIDER)
    private readonly db: NodePgDatabase,
  ) {}

  async create(createUserDto: CreateUserDtoType) {
    const { email, password, username } = createUserDto;

    const [existingUserWithSameEmailOrUsername] = await this.db
      .select({ email: users.email, username: users.username })
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .limit(1);

    if (existingUserWithSameEmailOrUsername) {
      if (existingUserWithSameEmailOrUsername.email === email) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "This email is already used",
        });
      } else {
        throw new TRPCError({
          code: "CONFLICT",
          message: "This username already exists",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const [createdUser] = await this.db
      .insert(users)
      .values({
        username,
        email,
        hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
      });

    return createdUser;
  }

  async findByEmail(findByEmailDto: FindByEmailDtoType) {
    const { email } = findByEmailDto;

    const [user] = await this.db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        hashedPassword: users.hashedPassword,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return null;
    }

    return user;
  }
}
