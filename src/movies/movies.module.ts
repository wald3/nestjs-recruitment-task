import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './services/movies.service';
import { OMDBApiService } from './services/omdb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService, OMDBApiService],
})
export class MoviesModule {}
