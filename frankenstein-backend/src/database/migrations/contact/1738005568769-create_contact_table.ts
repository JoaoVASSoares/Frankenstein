import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContactTable1738005568769 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contact",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "last_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "birthday",
            type: "date",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "contact_image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "whatsapp",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "zip_code",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "public_place",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "neighborhood",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "state",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "number",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
            default: "NULL",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
            default: "NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("contact");
  }
}
