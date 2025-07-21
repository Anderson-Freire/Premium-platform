import { MigrationInterface, QueryRunner } from "typeorm";

export class Subscription1752966647793 implements MigrationInterface {
    name = 'Subscription1752966647793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
