import {Entity} from 'typeorm';
import {Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm/index';
import {User} from './User';
import {Post} from './Post';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne('User','comments')
  user:User
  @ManyToOne('Post','comments')
  post:Post

}
