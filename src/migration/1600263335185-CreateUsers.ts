import {MigrationInterface, QueryRunner} from 'typeorm';
import {Table} from 'typeorm/index';

export class CreateUsers1600263335185 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true},
        {name:'username',type:'varchar'},
        {name:'password_digest',type:'varchar'}
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('users')
  }

}
