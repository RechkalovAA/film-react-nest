export class TicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class PostOrderDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}

export class OrderResultDto extends TicketDto {
  id: string;
}

export class OrderListResponseDto {
  total: number;
  items: OrderResultDto[];
}
