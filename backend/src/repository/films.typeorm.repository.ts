import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import {
  toFilmsListResponse,
  toScheduleDto,
  toScheduleListResponse,
} from './film.mapper';
import { FilmsRepository } from './films.repository.interface';
import { parseTaken, serializeTaken } from './taken.util';

@Injectable()
export class FilmsTypeOrmRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll() {
    const films = await this.filmRepository.find();
    return toFilmsListResponse(films);
  }

  async findScheduleByFilmId(filmId: string) {
    const film = await this.filmRepository.findOne({ where: { id: filmId } });

    if (!film) {
      return null;
    }

    const schedules = await this.scheduleRepository.find({
      where: { filmId },
    });

    return toScheduleListResponse(schedules);
  }

  async findScheduleItem(filmId: string, sessionId: string) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, filmId },
    });

    return schedule ? toScheduleDto(schedule) : null;
  }

  async addTakenSeats(filmId: string, sessionId: string, seatKeys: string[]) {
    if (seatKeys.length === 0) {
      return;
    }

    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, filmId },
    });

    if (!schedule) {
      return;
    }

    const taken = new Set([...parseTaken(schedule.taken), ...seatKeys]);
    schedule.taken = serializeTaken([...taken]);
    await this.scheduleRepository.save(schedule);
  }
}
