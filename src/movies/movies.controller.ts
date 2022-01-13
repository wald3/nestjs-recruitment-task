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
import { CreateMovieDto } from './dto/create-movie.dto';
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
  async create(@Body() createMovieDto: CreateMovieDto, @ReqUser() user: User) {
    if ((await this.moviesService.countAllByUserId(user.id)) < user.limit) {
      const { title } = createMovieDto;

      const movieData = await this.omdbApiService.getMovieByTitle(title);
      return this.moviesService.create(createMovieDto);
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  findAll(@ReqUser() user: User) {
    return this.moviesService.findAllByUserId(user.id);
  }
}
