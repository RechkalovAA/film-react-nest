import { Test, TestingModule } from '@nestjs/testing';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PostOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(OrderController);
    orderService = module.get(OrderService);
  });

  it('create вызывает orderService.create с dto', async () => {
    const dto: PostOrderDto = {
      email: 'user@example.com',
      phone: '+79990000000',
      tickets: [],
    };

    jest
      .spyOn(orderService, 'create')
      .mockResolvedValue({ total: 0, items: [] });

    await controller.create(dto);

    expect(orderService.create).toHaveBeenCalledWith(dto);
  });
});
