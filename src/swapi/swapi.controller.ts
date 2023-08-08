import { Controller, Get } from '@nestjs/common';
import { SwapiService } from '../swapi/swapi.service'; // Asegúrate de ajustar la ruta correcta

@Controller('swapi')
export class SwapiController {
  constructor(private swapiService: SwapiService) {}

  @Get()
  async getFilms() {
    const films = await this.swapiService.getFilms();
    return films;
  }
}