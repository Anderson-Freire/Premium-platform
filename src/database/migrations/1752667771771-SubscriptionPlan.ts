import { MigrationInterface, QueryRunner } from "typeorm";

export class SubscriptionPlan1752667771771 implements MigrationInterface {
  name = "SubscriptionPlan1752667771771";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "subscription_plan" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "durationindays" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_5fde988e5d9b9a522d70ebec27c" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "subscription_plan"`);
  }
}
