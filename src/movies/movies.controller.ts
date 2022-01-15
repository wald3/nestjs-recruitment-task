import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReqUser } from '../auth/decorators/req-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from '../auth/interfaces/user.interface';
import { SearchMovieDto } from './dto/serach-movie.dto';
import { Movie } from './entities/movie.entity';
import { MissingTitleException } from './exceptions/missing-title.exception';
import { MovieLimitException } from './exceptions/movie-limit.exception';
import { MoviesService } from './services/movies.service';
import { OMDBApiService } from './services/omdb.service';

@ApiTags('movies')
@Controller('movies')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'User is unauthorized.',
})
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly omdbApiService: OMDBApiService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SearchMovieDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Movie record has been successfully created.',
    type: Movie,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Title is missing.',
  })
  @ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Movie limit is reached.',
  })
  @ApiResponse({
    status: HttpStatus.GATEWAY_TIMEOUT,
    description: 'Movie api is temporarily unavailable.',
  })
  async create(
    @Body() searchMovieDto: SearchMovieDto,
    @ReqUser() user: User,
  ): Promise<Movie> {
    const { title } = searchMovieDto;
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
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie record has been successfully returned.',
    type: [Movie],
  })
  async findAll(@ReqUser() user: User): Promise<Movie[]> {
    return this.moviesService.findAllByUserId(user.id);
  }
}
