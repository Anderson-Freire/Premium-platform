import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { UserRole } from "src/common/constants/roles.enum";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { BcryptService } from "src/modules/auth/bcrypt.service";

@Injectable()
export class DefaultAdminInitializerService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: ConfigService,
    private readonly bcryptService: BcryptService
  ) {}

  async onModuleInit() {
    const adminEmail = this.config.get("DEFAULT_ADMIN_EMAIL");
    const adminPassword = this.config.get("DEFAULT_ADMIN_PASSWORD");

    if (!adminEmail || !adminPassword) console.warn("Variáveis não definidas!");

    const existingAdmin = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("Usuário admin já existe");
      return;
    }

    const hashedPassword = await this.bcryptService.hash(adminPassword);

    const adminUser = this.userRepository.create({
      name: this.config.get("DEFAULT_ADMIN_NAME"),
      email: adminEmail,
      password: hashedPassword,
      role: UserRole.ADMIN,
      email_confirmed: true,
    });

    try {
      await this.userRepository.save(adminUser);
      console.log("Usuário Admin criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar o admin:", error);
    }
  }
}
