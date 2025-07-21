import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { BcryptService } from "../auth/bcrypt.service";
import { UpdateUserDto } from "./dto/update-user-dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      select: ["id", "name", "email", "role", "email_confirmed"],
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException("Usuário não encontrado");

    if (dto.password) {
      dto.password = await this.bcryptService.hash(dto.password);
    }

    const updatedUser = this.userRepository.merge(user, dto);
    await this.userRepository.save(updatedUser);

    return { message: `Usuário ${id} atualizado com sucesso!` };
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException("Usuário não encontrado");

    await this.userRepository.remove(user);
    return { message: "Usuário deletado com sucesso" };
  }
}
