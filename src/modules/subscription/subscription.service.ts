import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { SubscriptionPlan } from "../subscription-plan/entitites/subscription.plan.entity";
import { Subscription } from "./entities/subscription.entity";
import { CreateSubscriptionDto } from "./dto/create-subscription-dto";
import { RedisService } from "src/common/redis/redis.service";
import {
  getAllSubscriptionsCacheKey,
  getSubscriptionCacheKey,
} from "src/common/utils/cache.key";
import { UpdateSubscriptionDto } from "./dto/update-subscription-dto";

@Injectable()
export class SubscriptionService {
  private readonly cacheTTLInDays = 1;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SubscriptionPlan)
    private readonly subPlanRepository: Repository<SubscriptionPlan>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly redisService: RedisService
  ) {}

  async createSubscription(userId: number, dto: CreateSubscriptionDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException("Usuário não encontrado");

    const plan = await this.subPlanRepository.findOneBy({ id: dto.planId });
    if (!plan || !plan.isActive) {
      throw new NotFoundException("Plano não encontrado");
    }

    const now = new Date();
    const end = new Date(
      now.getTime() + plan.durationindays * 24 * 60 * 60 * 1000
    );

    const subscription = this.subscriptionRepository.create({
      user,
      plan,
      startDate: now,
      endDate: end,
      isActive: true,
    });
    const saved = await this.subscriptionRepository.save(subscription);

    await this.redisService.setWithDaysTTL(
      getSubscriptionCacheKey(saved.id),
      JSON.stringify(saved),
      plan.durationindays
    );
    return { message: "Assinatura criada com sucesso!", saved };
  }

  async findAllSubscriptions() {
    const cacheKey = getAllSubscriptionsCacheKey();
    const cached = await this.redisService.get(cacheKey);

    if (cached) return JSON.parse(cached);

    const data = await this.subscriptionRepository.find();

    await this.redisService.setWithDaysTTL(
      cacheKey,
      JSON.stringify(data),
      this.cacheTTLInDays
    );

    return data;
  }

  async findSubscriptionById(id: number) {
    const cacheKey = getSubscriptionCacheKey(id);
    const cached = await this.redisService.get(cacheKey);

    if (cached) return JSON.parse(cached);

    const plan = await this.subscriptionRepository.findOneBy({ id });
    if (!plan) throw new NotFoundException("Plano não encontrado");

    await this.redisService.setWithDaysTTL(
      cacheKey,
      JSON.stringify(plan),
      this.cacheTTLInDays
    );
    return plan;
  }

  async updateSubscription(id: number, dto: UpdateSubscriptionDto) {
    const plan = await this.subscriptionRepository.findOneBy({ id });
    if (!plan) throw new NotFoundException("Plano não encontrado");

    const updated = await this.subscriptionRepository.save({ ...plan, ...dto });

    const cacheKey = getSubscriptionCacheKey(id);
    await this.redisService.setWithDaysTTL(
      cacheKey,
      JSON.stringify(updated),
      this.cacheTTLInDays
    );

    await this.redisService.del(getAllSubscriptionsCacheKey());

    return { message: "Assinatura atualizada com sucesso!", updated };
  }

  async deleteSubscription(id: number) {
    const plan = await this.subscriptionRepository.findOneBy({ id });
    if (!plan) throw new NotFoundException("Plano não encontrado");

    await this.subscriptionRepository.remove(plan);

    const cacheKey = getAllSubscriptionsCacheKey();
    await this.redisService.del(cacheKey);
    await this.redisService.del(getAllSubscriptionsCacheKey());

    return { message: "Assinatura deletada com sucesso!" };
  }
}
