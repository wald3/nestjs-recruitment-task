import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MovieDataDto } from '../dto/movie-data.dto';
import { MovieApiTimeoutException } from '../exceptions/movie-api-timeout.exception';
import { MovieNotFoundException } from '../exceptions/movie-not-found.exception';

@Injectable()
export class OMDBApiService {
  private readonly url = `http://www.omdbapi.com`;
  private readonly apiKey: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OMDB_API_KEY');
  }

  public async getMovieByTitle(title: string): Promise<MovieDataDto> {
    try {
      const movie: MovieDataDto = await this.http
        .get(this.url, {
          params: {
            apiKey: this.apiKey,
            t: title,
          },
        })
        .toPromise()
        .then((response) => {
          const { data } = response;
          if (data.Error) throw new MovieNotFoundException(title);

          const emptyValue = 'N/A';

          const movie: MovieDataDto = {
            title: data.Title,
            released:
              data.Released == emptyValue ? null : new Date(data.Released),
            genre: data.Genre,
            director: data.Director,
          };

          // If data from api is "Not Applicable" then insert NULL instead
          Object.keys(movie).forEach(
            (key) =>
              (movie[key] = movie[key] === emptyValue ? null : movie[key]),
          );

          return movie;
        })
        .catch((error) => {
          if (error.code === 'ETIMEDOUT') {
            throw new MovieApiTimeoutException();
          } else throw error;
        });

      return movie;
    } catch (error) {
      throw error;
    }
  }
}
