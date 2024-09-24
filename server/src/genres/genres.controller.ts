import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genre } from './interfaces/genre.interface';

@Controller('/genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get('/movies')
  async getMoviesGenres(): Promise<Genre[]> {
    return await this.genresService.getMoviesGenres();
  }
}
