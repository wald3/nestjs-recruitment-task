import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from '../auth/decorators/req-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from '../auth/interfaces/user.interface';
import { Movie } from './entities/movie.entity';
import { MissingTitleException } from './exceptions/missing-title.exception';
import { MovieLimitException } from './exceptions/movie-limit.exception';
import { MoviesService } from './services/movies.service';
import { OMDBApiService } from './services/omdb.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly omdbApiService: OMDBApiService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  async create(
    @Body('title') title: string,
    @ReqUser() user: User,
  ): Promise<Movie> {
    if (!title) throw new MissingTitleException();

    const movieCount = await this.moviesService.countAllByUserId(user.id);

    if (movieCount < user.limit) {
      const movieData = await this.omdbApiService.getMovieByTitle(title);
      return this.moviesService.create({ userId: user.id, ...movieData });
    } else {
      throw new MovieLimitException();
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async findAll(@ReqUser() user: User): Promise<Movie[]> {
    return this.moviesService.findAllByUserId(user.id);
  }
}
