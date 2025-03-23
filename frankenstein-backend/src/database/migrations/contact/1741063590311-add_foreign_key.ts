import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddForeignKey1741063590311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "contacts",
      "user_id",
      new TableColumn({
        name: "user_id",
        type: "int",
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      "contacts",
      new TableForeignKey({
        columnNames: ["user_id"], // Nome da coluna na tabela contacts
        referencedTableName: "users", // Nome da tabela referenciada
        referencedColumnNames: ["id"], // Nome da coluna referenciada (PK de users)
        onDelete: "SET NULL", // Se um usuário for deletado, o campo user_id será NULL
        onUpdate: "CASCADE", // Se o ID do usuário mudar, ele será atualizado na tabela contacts
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "contacts",
      "user_id",
      new TableColumn({
        name: "user_id",
        type: "varchar",
        isNullable: true,
      }),
    );
    const table = await queryRunner.getTable("contacts");
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes("user_id"));
    if (foreignKey) {
      await queryRunner.dropForeignKey("contacts", foreignKey);
    }
  }
}
