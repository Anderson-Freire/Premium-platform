import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Req,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guards/auth.guard";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "../users/dto/create-user-dto";
import { LoginDto } from "../users/dto/login-dto";
import { AuthRequest } from "src/types/express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("confirm")
  confirmEmail(@Query("token") token: string) {
    return this.authService.confirmEmail(token);
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  logout(@Req() req: AuthRequest) {
    return this.authService.logout(req.token);
  }
}
