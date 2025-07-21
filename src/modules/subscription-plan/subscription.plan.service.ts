import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubscriptionPlan } from "./entitites/subscription.plan.entity";
import { CreateSubscriptionPlanDto } from "./dto/create-subscription-plan-dto";
import { UpdateSubscriptionPlanDto } from "./dto/update-subcription-plan-dto";

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private readonly subPlanRepository: Repository<SubscriptionPlan>
  ) {}

  async createSubPlan(dto: CreateSubscriptionPlanDto) {
    const newPlan = this.subPlanRepository.create(dto);

    await this.subPlanRepository.save(newPlan);
    return { message: "Plano de Assinatura criado com sucesso!" };
  }

  async findAllSubPlan() {
    return await this.subPlanRepository.find();
  }

  async findSubPlanById(id: number) {
    return await this.subPlanRepository.findOneBy({ id });
  }

  async updateSubPlan(id: number, dto: UpdateSubscriptionPlanDto) {
    const isSubscribed = await this.subPlanRepository.findOneBy({ id });
    if (!isSubscribed) {
      throw new NotFoundException("Plano de assinatura não encontrado");
    }

    const updated = this.subPlanRepository.merge(isSubscribed, dto);
    await this.subPlanRepository.save(updated);
    return { message: `Usuário ${id} atualizado com sucesso!` };
  }

  async deleteSubPlan(id: number) {
    const isSubscribed = await this.subPlanRepository.findOneBy({ id });
    if (!isSubscribed)
      throw new NotFoundException("Plano de assinatura não encontrado");

    await this.subPlanRepository.remove(isSubscribed);
    return { message: "Plano de assinatura deletado com sucesso!" };
  }
}
