import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "subscription_plan" })
export class SubscriptionPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  durationindays!: number;

  @Column({ default: true })
  isActive!: boolean;
}
