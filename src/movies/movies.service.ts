import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) { }  
  async create(createMovieDto: CreateMovieDto) {
    try {
      const movie = this.movieRepository.create(createMovieDto);
      return await this.movieRepository.save(movie);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.movieRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.movieRepository.findOneBy({id_movie: id});
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      return await this.movieRepository.update({id_movie: id}, updateMovieDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.movieRepository.softDelete({id_movie: id}); 
    } catch (error) {
      console.log(error);
    }
  }
}
