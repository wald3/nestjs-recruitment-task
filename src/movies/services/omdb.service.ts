import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieApiTimeoutException } from '../exceptions/movie-api-timeout.exception';
import { MovieNotFoundException } from '../exceptions/movie-not-found.exception';

@Injectable()
export class OMDBApiService {
  private readonly url;
  private readonly apiKey: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.url = this.configService.get<string>('OMDB_BASE_URL');
    this.apiKey = this.configService.get<string>('OMDB_API_KEY');
  }

  public async getMovieByTitle(title: string): Promise<UpdateMovieDto> {
    try {
      const movie: UpdateMovieDto = await this.http
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

          const movie: UpdateMovieDto = {
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
