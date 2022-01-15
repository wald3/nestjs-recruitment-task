import { PartialType } from '@nestjs/mapped-types';
import { MovieDto } from './movie.dto';

export class MovieDataDto extends PartialType(MovieDto) {}
