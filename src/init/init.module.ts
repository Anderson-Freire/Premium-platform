import { Module } from "@nestjs/common";
import { DefaultAdminInitializerService } from "./default.admin.initializer.service";
import { User } from "src/modules/users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BcryptService } from "src/modules/auth/bcrypt.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DefaultAdminInitializerService, BcryptService],
  exports: [DefaultAdminInitializerService],
})
export class InitModule {}
