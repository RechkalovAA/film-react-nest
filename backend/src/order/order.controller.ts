import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderListResponseDto, PostOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() dto: PostOrderDto): Promise<OrderListResponseDto> {
    return this.orderService.create(dto);
  }
}
