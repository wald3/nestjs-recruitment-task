import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MovieDataDto } from '../dto/movie-data.dto';
import { MovieApiTimeoutException } from '../exceptions/movie-api-timeout.exception';

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
      const movieResponse = await this.http
        .get<MovieDataDto>(this.url, {
          params: {
            apiKey: this.apiKey,
            t: title,
          },
          transformResponse: (dataJson: string) => {
            const emptyValue = 'N/A';
            const data = JSON.parse(dataJson);

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
          },
        })
        .toPromise();

      return movieResponse?.data;
    } catch (error) {
      throw new MovieApiTimeoutException();
    }
  }
}
