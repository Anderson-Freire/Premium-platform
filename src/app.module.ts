import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./modules/users/entities/user.entity";
import { UserModule } from "./modules/users/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DefaultAdminInitializerService } from "./init/default.admin.initializer.service";
import { InitModule } from "./init/init.module";
import { SubscriptionPlanModule } from "./modules/subscription-plan/subscription.plan.module";
import { SubscriptionPlan } from "./modules/subscription-plan/entitites/subscription.plan.entity";
import { SubscriptionModule } from "./modules/subscription/subscription.module";
import { Subscription } from "./modules/subscription/entities/subscription.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT"),
        username: config.get("DB_USERNAME"),
        password: config.get("DB_PASSWORD"),
        database: config.get("DB_DATABASE"),
        entities: [User, SubscriptionPlan, Subscription],
        // logging: true,
      }),
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    InitModule,
    SubscriptionPlanModule,
    SubscriptionModule,
  ],
})
export class AppModule {}
