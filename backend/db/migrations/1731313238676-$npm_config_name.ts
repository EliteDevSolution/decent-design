import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class $npmConfigName1731313238676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'design_temp',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'design_name',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'isTemplate',
            type: 'boolean',
          },
          {
            name: 'created',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'modified',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Create foreign key for user_id
    await queryRunner.createForeignKey(
      'design_temp',
      new TableForeignKey({
        name: 'design_temp_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key for user_id
    const table = await queryRunner.getTable('design_temp');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('design_temp', foreignKey);

    // Drop the client table
    await queryRunner.dropTable('design_temp');
  }
}
