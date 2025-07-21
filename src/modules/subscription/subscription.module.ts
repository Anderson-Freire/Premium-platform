import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subscription } from "./entities/subscription.entity";
import { User } from "../users/entities/user.entity";
import { SubscriptionPlan } from "../subscription-plan/entitites/subscription.plan.entity";
import { RedisModule } from "src/common/redis/redis.module";
import { AuthModule } from "../auth/auth.module";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionController } from "./subcription.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, User, SubscriptionPlan]),
    RedisModule,
    AuthModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
