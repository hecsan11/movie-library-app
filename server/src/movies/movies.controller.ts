import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './interfaces/movie.interface';

@Controller('/movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post('/newmovie')
  async create(@Body() createMovieDto: CreateMovieDto) {
    this.moviesService.create(createMovieDto);
  }

  @Get('/toprated')
  async findAll(
    @Query('page') page: number,
    @Query('genres') genres: string,
  ): Promise<Movie[]> {
    return this.moviesService.findAll(page, genres);
  }

  @Get('/upcoming')
  async findAllUpcoming(): Promise<Movie[]> {
    return this.moviesService.findAllUpcoming();
  }

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<Movie[]> {
    return await this.moviesService.findOneById(id);
  }

  @Get('/')
  async searchMovieByTitle(
    @Query('query') title: string,
    @Query('page') page: number,
  ): Promise<Movie[]> {
    return await this.moviesService.searchMovieByTitle(title, page);
  }

  @Get('/airingtoday')
  async findAllTvAiringToday(): Promise<any> {
    return await this.moviesService.findAllTvAiringToday();
  }
}
