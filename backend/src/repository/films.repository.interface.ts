import {
  FilmsListResponseDto,
  ScheduleDto,
  ScheduleListResponseDto,
} from '../films/dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<FilmsListResponseDto>;
  findScheduleByFilmId(filmId: string): Promise<ScheduleListResponseDto | null>;
  findScheduleItem(
    filmId: string,
    sessionId: string,
  ): Promise<ScheduleDto | null>;
  addTakenSeats(
    filmId: string,
    sessionId: string,
    seatKeys: string[],
  ): Promise<void>;
}

export const FILMS_REPOSITORY = 'FILMS_REPOSITORY';
