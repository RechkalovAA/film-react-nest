import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository.interface';
import { toFilmsListResponse, toScheduleListResponse } from './film.mapper';
import { FilmModel } from './schemas/film.schema';

@Injectable()
export class FilmsMongoDbRepository implements FilmsRepository {
  async findAll() {
    const docs = await FilmModel.find({}, { schedule: 0 }).lean();
    return toFilmsListResponse(docs);
  }

  async findScheduleByFilmId(filmId: string) {
    const doc = await FilmModel.findOne({ id: filmId }).lean();
    if (!doc) {
      return { total: 0, items: [] };
    }
    return toScheduleListResponse(doc.schedule);
  }

  async findScheduleItem(filmId: string, sessionId: string) {
    const doc = await FilmModel.findOne({ id: filmId }).lean();
    if (!doc) {
      return null;
    }
    return doc.schedule.find((item) => item.id === sessionId) ?? null;
  }

  async addTakenSeats(filmId: string, sessionId: string, seatKeys: string[]) {
    if (seatKeys.length === 0) {
      return;
    }
    await FilmModel.findOneAndUpdate(
      { id: filmId, 'schedule.id': sessionId },
      { $addToSet: { 'schedule.$.taken': { $each: seatKeys } } },
    );
  }
}
