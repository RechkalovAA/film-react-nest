import { Test, TestingModule } from '@nestjs/testing';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            findAll: jest.fn(),
            findSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(FilmsController);
    filmsService = module.get(FilmsService);
  });

  it('findAll вызывает filmsService.findAll', async () => {
    jest
      .spyOn(filmsService, 'findAll')
      .mockResolvedValue({ total: 0, items: [] });

    await controller.findAll();

    expect(filmsService.findAll).toHaveBeenCalled();
  });

  it('findSchedule вызывает filmsService.findSchedule с id', async () => {
    const filmId = '00000000-0000-0000-0000-000000000001';
    jest
      .spyOn(filmsService, 'findSchedule')
      .mockResolvedValue({ total: 0, items: [] });

    await controller.findSchedule(filmId);

    expect(filmsService.findSchedule).toHaveBeenCalledWith(filmId);
  });
});
