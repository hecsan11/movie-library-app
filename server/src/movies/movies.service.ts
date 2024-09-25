import { Injectable, Logger } from '@nestjs/common';
import { Movie } from './interfaces/movie.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

@Injectable()
export class MoviesService {
  private readonly movies: Movie[] = [];
  private readonly logger = new Logger(MoviesService.name);
  constructor(private readonly httpService: HttpService) {}

  create(movie: Movie) {
    this.movies.push(movie);
  }

  async findAll(page: number, genres: string): Promise<Movie[]> {
    const headers: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTU1My4yODI4NTIsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rsDAd5YKho9klASxGdYJWQxNQKBzCEmyCe9wWoZPkoQ',
      },
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get<
          Movie[]
        >('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=' + page + '&sort_by=popularity.desc' + '&with_genres=' + genres, headers)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async findAllUpcoming(): Promise<Movie[]> {
    const headers: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTU1My4yODI4NTIsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rsDAd5YKho9klASxGdYJWQxNQKBzCEmyCe9wWoZPkoQ',
      },
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get<
          Movie[]
        >('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', headers)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async findOneById(id: number): Promise<Movie[]> {
    const headers: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTU1My4yODI4NTIsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rsDAd5YKho9klASxGdYJWQxNQKBzCEmyCe9wWoZPkoQ',
      },
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get<Movie[]>('https://api.themoviedb.org/3/movie/' + id, headers)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async searchMovieByTitle(title: string, page: number): Promise<Movie[]> {
    const headers: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTU1My4yODI4NTIsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rsDAd5YKho9klASxGdYJWQxNQKBzCEmyCe9wWoZPkoQ',
      },
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get<
          Movie[]
        >('https://api.themoviedb.org/3/search/movie?query=' + title + '&page=' + page, headers)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async findAllTvAiringToday(): Promise<any> {
    const url = 'https://api.themoviedb.org/3/movie/latest';
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTU1My4yODI4NTIsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rsDAd5YKho9klASxGdYJWQxNQKBzCEmyCe9wWoZPkoQ',
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.get<any>(url, headers).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
