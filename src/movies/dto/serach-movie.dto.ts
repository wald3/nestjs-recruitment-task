import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchMovieDto {
  @ApiProperty({ description: 'The name of the movie you are looking for.' })
  @IsNotEmpty()
  title: string;
}
