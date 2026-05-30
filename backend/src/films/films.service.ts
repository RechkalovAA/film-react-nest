import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  async findSchedule(id: string): Promise<ScheduleListResponseDto> {
    const schedule = await this.filmsRepository.findScheduleByFilmId(id);

    if (!schedule) {
      throw new HttpException(
        { error: 'Film not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return schedule;
  }
}
