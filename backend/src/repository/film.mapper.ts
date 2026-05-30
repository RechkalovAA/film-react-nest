import {
  FilmDto,
  FilmsListResponseDto,
  ScheduleDto,
  ScheduleListResponseDto,
} from '../films/dto/films.dto';
import { FilmDocument, ScheduleDocument } from './schemas/film.schema';

export function toFilmDto(doc: FilmDocument): FilmDto {
  return {
    id: doc.id,
    rating: doc.rating,
    director: doc.director,
    tags: doc.tags,
    image: doc.image,
    cover: doc.cover,
    title: doc.title,
    about: doc.about,
    description: doc.description,
  };
}

export function toScheduleDto(schedule: ScheduleDocument): ScheduleDto {
  return {
    id: schedule.id,
    daytime: schedule.daytime,
    hall: schedule.hall,
    rows: schedule.rows,
    seats: schedule.seats,
    price: schedule.price,
    taken: schedule.taken,
  };
}

export function toFilmsListResponse(
  docs: FilmDocument[],
): FilmsListResponseDto {
  return {
    total: docs.length,
    items: docs.map(toFilmDto),
  };
}

export function toScheduleListResponse(
  schedules: ScheduleDocument[],
): ScheduleListResponseDto {
  return {
    total: schedules.length,
    items: schedules.map(toScheduleDto),
  };
}
