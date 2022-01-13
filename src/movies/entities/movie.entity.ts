import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Exclude()
  @Column()
  addedBy: string;

  @Column()
  title: string;

  @Column()
  released: Date;

  @Column()
  genre: string;

  @Column()
  director: string;
}
