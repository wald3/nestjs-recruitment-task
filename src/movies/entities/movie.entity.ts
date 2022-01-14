import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Exclude()
  @Column()
  userId: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  released?: Date;

  @Column({ nullable: true })
  genre?: string;

  @Column({ nullable: true })
  director?: string;

  @Exclude()
  @CreateDateColumn()
  public createdAt: Date;
}
