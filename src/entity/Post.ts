import {Entity} from 'typeorm';
import {Column, PrimaryGeneratedColumn} from 'typeorm/index';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  title: string;
  @Column('text')
  content: string;
}
