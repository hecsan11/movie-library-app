import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { HttpModule } from '@nestjs/axios';
import { GenresService } from './genres/genres.service';
import { GenresController } from './genres/genres.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, MoviesController, GenresController],
  providers: [AppService, MoviesService, GenresService],
})
export class AppModule {}
