import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.create(createMovieDto);
    return this.moviesRepository.save(movie);
  }

  findAllByUserId(id: string): Promise<Movie[]> {
    return this.moviesRepository.find({ where: { addedBy: id } });
  }

  countAllByUserId(id: string): Promise<number> {
    return this.moviesRepository.count({ where: { addedBy: id } });
  }
}
