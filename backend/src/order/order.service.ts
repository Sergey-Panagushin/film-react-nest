import { Injectable, BadRequestException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto, TicketDto } from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    const { tickets } = createOrderDto;
    const result: (TicketDto & { id: string })[] = [];

    for (const ticket of tickets) {
      const film = await this.filmsRepository.findById(ticket.film);

      if (!film) {
        throw new BadRequestException(`Фильм ${ticket.film} не найден`);
      }

      const session = film.schedule.find((s) => s.id === ticket.session);

      if (!session) {
        throw new BadRequestException(`Сеанс ${ticket.session} не найден`);
      }

      const seat = `${ticket.row}:${ticket.seat}`;
      const takenSeats = session.taken || [];

      if (takenSeats.includes(seat)) {
        throw new BadRequestException(`Место ${seat} уже занято`);
      }

      await this.filmsRepository.updateTaken(ticket.film, ticket.session, seat);
      result.push({ ...ticket, id: uuidv4() });
    }

    return { total: result.length, items: result };
  }
}
