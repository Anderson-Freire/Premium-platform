import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { User } from "../users/entities/user.entity";

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}

  generate(user: User): string {
    const jwtSecret = this.configService.get("JWT_SECRET");
    const expiresIn = this.configService.get("EXPIRES_IN");

    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn }
    );
  }

  verify(token: string) {
    const jwtSecret = this.configService.get("JWT_SECRET");
    return jwt.verify(token, jwtSecret);
  }

  generateEmailConfirmToken(user: User): string {
    const jwtSecret = this.configService.get("JWT_SECRET");
    const expiresIn = this.configService.get("EMAIL_CONFIRM_TTL");

    return jwt.sign({ email: user.email }, jwtSecret, { expiresIn });
  }
}
