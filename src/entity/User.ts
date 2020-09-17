import {Entity} from 'typeorm';
import {Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm/index';
import {Comment} from './Comment';
import {Post} from './Post';

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
}
