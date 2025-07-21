import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailConfirmMigration1751913575205 implements MigrationInterface {
    name = 'EmailConfirmMigration1751913575205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email_confirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email_confirmed"`);
    }

}
