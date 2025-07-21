import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @MinLength(3)
  password!: string;
}
