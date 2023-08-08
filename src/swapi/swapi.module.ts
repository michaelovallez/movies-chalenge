import { SwapiService } from './swapi.service';
import { Module } from '@nestjs/common';
import { SwapiController } from './swapi.controller';
import { MoviesModule } from 'src/movies/movies.module';



@Module({
  imports: [MoviesModule],
  controllers: [SwapiController],
  providers: [SwapiService]
})
export class SwapiModule {}
