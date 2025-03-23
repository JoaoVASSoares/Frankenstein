import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameContactTable1740675974250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("contact", "contacts");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("contacts", "contact");
  }
}
