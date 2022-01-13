import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MovieData } from '../interfaces/movie-data.interface';

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

  public async getMovieByTitle(title: string): Promise<any> {
    if (!title) throw new BadRequestException('Title is absent!');

    const movie = await this.http
      .get<MovieData>(this.url, {
        params: {
          apiKey: this.apiKey,
          t: title,
        },
        transformResponse: (r: { data: MovieData }) => r.data,
      })
      .toPromise();

    console.log(movie);

    return null;
  }
}
