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
      .where({ userId: id })
      .select([
        `date_trunc('month', m.createdAt) AS month`,
        `count(*) AS movies`,
      ])
      .groupBy('month')
      .orderBy('month', 'DESC');

    const result = await query.getRawOne<{
      month: string;
      movies: number;
    }>();

    if (result) {
      const { month: lastMonth } = result;
      if (lastMonth) {
        const currentMonthNumber = new Date(Date.now()).getMonth();
        const lastMonthNumber = new Date(lastMonth).getMonth();

        if (currentMonthNumber != lastMonthNumber) {
          return 0;
        }
      }

      return result.movies;
    } else return 0;
  }
}
