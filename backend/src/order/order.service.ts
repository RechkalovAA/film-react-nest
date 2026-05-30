import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  FILMS_REPOSITORY,
  FilmsRepository,
} from '../repository/films.repository.interface';
import {
  OrderListResponseDto,
  OrderResultDto,
  PostOrderDto,
  TicketDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async create(dto: PostOrderDto): Promise<OrderListResponseDto> {
    if (!dto.tickets?.length) {
      return { total: 0, items: [] };
    }

    const seen = new Set<string>();
    for (const ticket of dto.tickets) {
      const key = this.ticketKey(ticket);
      if (seen.has(key)) {
        throw new HttpException(
          { error: 'Duplicate seat in order' },
          HttpStatus.BAD_REQUEST,
        );
      }
      seen.add(key);
    }

    const seatsBySession = new Map<string, string[]>();

    for (const ticket of dto.tickets) {
      const seatKey = this.seatKey(ticket.row, ticket.seat);
      const schedule = await this.filmsRepository.findScheduleItem(
        ticket.film,
        ticket.session,
      );

      if (!schedule) {
        throw new HttpException(
          { error: 'Film or session not found' },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        ticket.row < 1 ||
        ticket.row > schedule.rows ||
        ticket.seat < 1 ||
        ticket.seat > schedule.seats
      ) {
        throw new HttpException(
          { error: 'Invalid seat' },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (schedule.taken.includes(seatKey)) {
        throw new HttpException(
          { error: 'Seat already taken' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const sessionKey = `${ticket.film}:${ticket.session}`;
      const seats = seatsBySession.get(sessionKey) ?? [];
      seats.push(seatKey);
      seatsBySession.set(sessionKey, seats);
    }

    for (const [sessionKey, seatKeys] of seatsBySession) {
      const [filmId, sessionId] = sessionKey.split(':');
      await this.filmsRepository.addTakenSeats(filmId, sessionId, seatKeys);
    }

    const items: OrderResultDto[] = dto.tickets.map((ticket) => ({
      ...ticket,
      id: randomUUID(),
    }));

    return { total: items.length, items };
  }

  private seatKey(row: number, seat: number): string {
    return `${row}:${seat}`;
  }

  private ticketKey(ticket: TicketDto): string {
    return `${ticket.film}:${ticket.session}:${ticket.row}:${ticket.seat}`;
  }
}
