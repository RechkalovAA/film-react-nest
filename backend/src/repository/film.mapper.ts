import {
  FilmDto,
  FilmsListResponseDto,
  ScheduleDto,
  ScheduleListResponseDto,
} from '../films/dto/films.dto';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { parseTaken } from './taken.util';

function parseTags(tags: string): string[] {
  if (!tags) {
    return [];
  }

  if (tags.includes(',')) {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [tags];
}

export function toFilmDto(film: Film): FilmDto {
  return {
    id: film.id,
    rating: film.rating,
    director: film.director,
    tags: parseTags(film.tags),
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
    taken: parseTaken(schedule.taken),
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
