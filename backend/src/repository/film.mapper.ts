import {
  FilmDto,
  FilmsListResponseDto,
  ScheduleDto,
  ScheduleListResponseDto,
} from '../films/dto/films.dto';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

export function toFilmDto(film: Film): FilmDto {
  return {
    id: film.id,
    rating: film.rating,
    director: film.director,
    tags: film.tags ?? [],
    image: film.image,
    cover: film.cover,
    title: film.title,
    about: film.about,
    description: film.description,
  };
}

export function toScheduleDto(schedule: Schedule): ScheduleDto {
  return {
    id: schedule.id,
    daytime: schedule.daytime,
    hall: schedule.hall,
    rows: schedule.rows,
    seats: schedule.seats,
    price: schedule.price,
    taken: schedule.taken ?? [],
  };
}

export function toFilmsListResponse(films: Film[]): FilmsListResponseDto {
  return {
    total: films.length,
    items: films.map(toFilmDto),
  };
}

export function toScheduleListResponse(
  schedules: Schedule[],
): ScheduleListResponseDto {
  return {
    total: schedules.length,
    items: schedules.map(toScheduleDto),
  };
}
