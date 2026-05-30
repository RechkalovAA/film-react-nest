import {
  FilmsListResponseDto,
  ScheduleListResponseDto,
} from '../films/dto/films.dto';
import { ScheduleDocument } from './schemas/film.schema';

export interface FilmsRepository {
  findAll(): Promise<FilmsListResponseDto>;
  findScheduleByFilmId(filmId: string): Promise<ScheduleListResponseDto | null>;
  findScheduleItem(
    filmId: string,
    sessionId: string,
  ): Promise<ScheduleDocument | null>;
  addTakenSeats(
    filmId: string,
    sessionId: string,
    seatKeys: string[],
  ): Promise<void>;
}

export const FILMS_REPOSITORY = 'FILMS_REPOSITORY';
