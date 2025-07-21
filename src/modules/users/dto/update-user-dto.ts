import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user-dto";
import { UserRole } from "src/common/constants/roles.enum";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
