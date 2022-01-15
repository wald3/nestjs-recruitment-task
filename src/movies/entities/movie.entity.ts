import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
  @ApiHideProperty()
  public uuid: string;

  @Exclude()
  @Column()
  @ApiHideProperty()
  userId: string;

  @Column()
  @ApiProperty({ description: 'Movie title.' })
  title: string;

  @Column({ nullable: true })
  @ApiProperty({
    default: null,
    description: 'Movie release Date.',
  })
  released?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Movie genre.' })
  genre?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Movie director/s.' })
  director?: string;

  @Exclude()
  @CreateDateColumn()
  @ApiHideProperty()
  public createdAt: Date;
}
