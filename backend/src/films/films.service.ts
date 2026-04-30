import { FilmsRepository } from '../repository/films.repository';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();
    return { total: films.length, items: films };
  }

  async findSchedule(id: string) {
    const film = await this.filmsRepository.findById(id);
    if (!film) {
      throw new UnprocessableEntityException(`Невалидный идентификатор: ${id}`);
    }
    return { total: film.schedule.length, items: film.schedule };
  }
}