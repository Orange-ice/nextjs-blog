import {Entity} from 'typeorm';
import {Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm/index';
import {Comment} from './Comment';
import {User} from './User';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  title: string;
  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany('Comment', 'post')
  comments: Comment[];
  @ManyToOne('User', 'posts')
  author: User;
}
