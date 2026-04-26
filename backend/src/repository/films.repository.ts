import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';

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
    return this.filmRepository.findOne({ where: { id } });
  }

  async updateTaken(filmId: string, sessionId: string, seat: string) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId },
    });

    if (!schedule) return null;

    const taken = schedule.taken
      ? schedule.taken.split(',').filter((s) => s)
      : [];
    taken.push(seat);
    schedule.taken = taken.join(',');

    return this.scheduleRepository.save(schedule);
  }
}
