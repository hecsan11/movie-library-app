import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Genre } from './interfaces/genre.interface';

@Injectable()
export class GenresService {
  private readonly genres: Genre[] = [];
  private readonly logger = new Logger(GenresService.name);
  constructor(private readonly httpService: HttpService) {}

  async getMoviesGenres(): Promise<Genre[]> {
    const headers: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTU1My4yODI4NTIsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rsDAd5YKho9klASxGdYJWQxNQKBzCEmyCe9wWoZPkoQ',
      },
    };
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const { data } = await firstValueFrom(
      this.httpService.get<Genre[]>(url, headers).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
