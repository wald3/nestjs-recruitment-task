import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = await this.moviesRepository.create(movieData);
    return this.moviesRepository.save(movie);
  }

  async findAllByUserId(id: string): Promise<Movie[]> {
    return this.moviesRepository.find({ where: { userId: id } });
  }

  async countAllByUserId(id: string): Promise<number> {
    const query = this.moviesRepository
      .createQueryBuilder('m')
      .select([`count(*) as "movieCount"`])
      .where({ userId: id })
      // first day of the current month
      .andWhere(`m."createdAt" > date_trunc('month', current_date)::date`)
      // last day of the current month
      .andWhere(
        `m."createdAt" < (date_trunc('month', now()) + interval '1 month - 1 day')::date`,
      );

    const result = await query.getRawOne<{ movieCount: number }>();

    return result?.movieCount || 0;
  }
}
