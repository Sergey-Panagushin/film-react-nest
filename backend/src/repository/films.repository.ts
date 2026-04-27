import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll() {
    return this.filmRepository.find();
  }

  async findById(id: string) {
    try {
      return await this.filmRepository.findOne({ where: { id } });
    } catch {
      return null;
    }
  }

  async updateTaken(filmId: string, sessionId: string, seat: string) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId },
    });

    if (!schedule) return null;

    schedule.taken = [...(schedule.taken || []), seat];

    return this.scheduleRepository.save(schedule);
  }
}
