import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { SubscriptionPlan } from "src/modules/subscription-plan/entitites/subscription.plan.entity";

@Entity({ name: "subscription" })
export class Subscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => SubscriptionPlan)
  plan!: SubscriptionPlan;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column({ default: false })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
