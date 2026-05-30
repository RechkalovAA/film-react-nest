import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsListResponseDto, ScheduleListResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): Promise<FilmsListResponseDto> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findSchedule(@Param('id') id: string): Promise<ScheduleListResponseDto> {
    return this.filmsService.findSchedule(id);
  }
}
