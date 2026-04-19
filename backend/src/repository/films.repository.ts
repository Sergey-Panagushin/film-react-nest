import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll() {
    return this.filmModel.find().exec();
  }

  async findById(id: string) {
    return this.filmModel.findOne({ id }).exec();
  }

  async updateTaken(filmId: string, sessionId: string, seat: string) {
    return this.filmModel.updateOne(
      { id: filmId, 'schedule.id': sessionId },
      { $push: { 'schedule.$.taken': seat } },
    ).exec();
  }
}