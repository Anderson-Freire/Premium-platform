import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionPlan } from "./entitites/subscription.plan.entity";
import { SubscriptionPlansService } from "./subscription.plan.service";
import { SubscriptionPlanController } from "./subscription.plan.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlan]), AuthModule],
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlansService],
  exports: [SubscriptionPlansService],
})
export class SubscriptionPlanModule {}
