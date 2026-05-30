import { Inject, Injectable } from '@nestjs/common';
import { FilmsListResponseDto, ScheduleListResponseDto } from './dto/films.dto';
import {
  FILMS_REPOSITORY,
  FilmsRepository,
} from '../repository/films.repository.interface';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  findAll(): Promise<FilmsListResponseDto> {
    return this.filmsRepository.findAll();
  }

  findSchedule(id: string): Promise<ScheduleListResponseDto> {
    return this.filmsRepository.findScheduleByFilmId(id);
  }
}
