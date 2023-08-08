import { Injectable, BadRequestException } from '@nestjs/common';
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
      const existingMovie = await this.movieRepository.findOneBy({ title: createMovieDto.title });
      if (existingMovie) {
        throw new BadRequestException('Movie already exists');
      }else{
        const movie = this.movieRepository.create(createMovieDto);
        return await this.movieRepository.save(movie);
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async createBulk(movieDtos: CreateMovieDto[]): Promise<Movie[]> {
    try {
      const savedMovies = await Promise.all(
        movieDtos.map(async (movieDto) => {
          const existingMovie = await this.movieRepository.findOneBy({ title: movieDto.title });

          if (!existingMovie) {
            const newMovie = this.movieRepository.create(movieDto);
            return this.movieRepository.save(newMovie);
          }
        })
      );

      return savedMovies;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.movieRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.movieRepository.findOneBy({id_movie: id});
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      return await this.movieRepository.update({id_movie: id}, updateMovieDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.movieRepository.softDelete({id_movie: id}); 
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
