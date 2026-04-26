import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();
    return { total: films.length, items: films };
  }

  async findSchedule(id: string) {
    const film = await this.filmsRepository.findById(id);
    if (!film) return { total: 0, items: [] };
    return { total: film.schedule.length, items: film.schedule };
  }
}
