// src/modules/users/dto/test-role.dto.ts
import { IsEnum } from "class-validator";
import { UserRole } from "src/common/constants/roles.enum";

export class TestRoleDto {
  @IsEnum(UserRole)
  role?: UserRole;
}
