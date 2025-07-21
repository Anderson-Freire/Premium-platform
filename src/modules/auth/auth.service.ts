import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenService } from "./jwt.service";
import { BcryptService } from "./bcrypt.service";
import { CreateUserDto } from "../users/dto/create-user-dto";
import { LoginDto } from "../users/dto/login-dto";
import { RedisService } from "src/common/redis/redis.service";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "src/common/mail/email.service";
import { parseTTL } from "src/common/redis/redis.constants";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
    private readonly bcryptService: BcryptService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  async register(dto: CreateUserDto) {
    const { name, email, password } = dto;
    const existing = await this.userRepository.findOneBy({ email });
    if (existing) throw new BadRequestException("E-mail já registrado");

    const hashedPassword = await this.bcryptService.hash(password);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
    const token = this.tokenService.generateEmailConfirmToken(newUser);
    await this.emailService.sendConfirmEmail(newUser, token);

    return {
      message:
        "Usuário registrado com sucesso, verifique seu E-mail para logar",
    };
  }

  async confirmEmail(token: string) {
    try {
      const decoded = this.tokenService.verify(token) as { email: string };
      const user = await this.userRepository.findOneBy({
        email: decoded.email,
      });

      if (!user) throw new NotFoundException("Usuário não encontrado");
      user.email_confirmed = true;
      await this.userRepository.save(user);

      return "E-mail confirmado com sucesso";
    } catch (error) {
      throw new BadGatewayException("Token inválido ou expirado");
    }
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException("E-mail não autorizado");

    if (!user.email_confirmed) {
      throw new UnauthorizedException("Confirme seu E-mail antes de logar!");
    }

    const match = await this.bcryptService.compare(password, user.password);
    if (!match) throw new UnauthorizedException("Credenciais inválidas");

    const token = this.tokenService.generate(user);
    const expiresIn = this.configService.get("EXPIRES_IN");
    const ttl = parseTTL(expiresIn);

    await this.redisService.set(`auth-token-${user.id}`, token, ttl);

    return { message: "Login realizado com sucesso", token };
  }

  async logout(token: string) {
    const ttl = parseTTL("1h");
    await this.redisService.blacklistToken(token, ttl);
    return { message: "Logout feito com sucesso!" };
  }
}
