import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { TokenService } from "src/modules/auth/jwt.service";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly redisService: RedisService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token não fornecido");
    }

    const token = authHeader.split(" ")[1].replace(/"/g, "");

    if (await this.redisService.isBlackListed(token)) {
      throw new UnauthorizedException("Token inválido ou expirado (blacklist)");
    }

    try {
      const decoded = this.tokenService.verify(token);

      request.user = decoded;
      request.token = token;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Token inválido ou expirado");
    }
  }
}
