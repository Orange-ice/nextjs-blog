import {Entity} from 'typeorm';
import {Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm/index';
import {Comment} from './Comment';
import {Post} from './Post';
import {getDatabaseConnection} from '../../lib/getDatebaseConnection';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  username: string;
  @Column('varchar')
  passwordDigest: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];
  @OneToMany(type => Post, post => post.author)
  posts: Post[];

  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[]
  };
  password: string;
  passwordConfirmation: string;

  async validate() {
    const found = await (await getDatabaseConnection()).manager.find(
      User, {username: this.username}
    );
    if (found) {
      this.errors.username.push('用户名已存在，不能重复注册');
    }
    if (this.username.trim() === '') {
      this.errors.username.push('用户名不能为空');
    }
    if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
      this.errors.username.push('用户名格式不合法');
    }
    if (this.username.trim().length > 16) {
      this.errors.username.push('用户名太长');
    }
    if (this.username.trim().length < 4) {
      this.errors.username.push('用户名太短');
    }

    if (this.password === '') {
      this.errors.password.push('密码不能为空');
    }
    if (this.password.length < 6) {
      this.errors.password.push('密码太短');
    }
    if (this.password.length > 16) {
      this.errors.password.push('密码太长');
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.passwordConfirmation.push('密码不匹配');
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find(v => v.length > 0);
  }
}
