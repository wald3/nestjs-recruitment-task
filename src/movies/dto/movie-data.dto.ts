import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class MovieDataDto extends PartialType(CreateMovieDto) {}
