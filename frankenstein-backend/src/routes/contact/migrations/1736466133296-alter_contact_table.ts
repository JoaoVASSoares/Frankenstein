import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterContactTable1736466133296 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("contact", "userId", "user_id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("contact", "user_id", "userId");
  }
}
