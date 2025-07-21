import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TokenService } from "./jwt.service";
import { BcryptService } from "./bcrypt.service";
import { EmailService } from "src/common/mail/email.service";
import { RedisService } from "src/common/redis/redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    BcryptService,
    EmailService,
    RedisService,
  ],
  exports: [TokenService, BcryptService, RedisService],
})
export class AuthModule {}
