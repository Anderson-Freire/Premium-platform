import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { UserRole } from "src/common/constants/roles.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user-dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.userService.getUserById(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch("update/:id")
  updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(+id);
  }
}
