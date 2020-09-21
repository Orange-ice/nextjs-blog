import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableIndex} from 'typeorm/index';

export class AddUniqueUsernameToUsers1600657687642 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex('users', new TableIndex({
      name: 'user_name', columnNames: ['username'],
      isUnique: true
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'user_name');
  }

}

// 数据库层校验 username 的唯一性
