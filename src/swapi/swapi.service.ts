import { MoviesService } from './../movies/movies.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Film } from './interface/film.interface';

@Injectable()
export class SwapiService {
    private readonly swapiBaseUrl = 'https://swapi.dev/api';
    constructor(
        private readonly moviesService: MoviesService,
        
      ) { }
      async getFilms(){
        try {
            const response = await axios.get(`${this.swapiBaseUrl}/films`);
            const films = response.data.results.map((film: Film) => {
                return {
                    ...film,
                    description: film.opening_crawl // Agrega aquí el nuevo campo y su valor
                };
            });
            const starWarsFilms = await this.moviesService.createBulk(films);
    
            return starWarsFilms;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

