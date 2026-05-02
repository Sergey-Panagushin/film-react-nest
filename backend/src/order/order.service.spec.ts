import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/films.repository';

describe('OrderService', () => {
  let service: OrderService;

  const filmsRepositoryMock = {
    findById: jest.fn(),
    updateTaken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FilmsRepository,
          useValue: filmsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('сервис должен быть определён', () => {
    expect(service).toBeDefined();
  });

  it('метод create должен выбросить ошибку если фильм не найден', async () => {
    filmsRepositoryMock.findById.mockResolvedValue(null);
    await expect(
      service.create({
        email: 'test@test.ru',
        phone: '+7',
        tickets: [
          {
            film: 'non-existent-id',
            session: 'session-id',
            daytime: '2024-01-01',
            row: 1,
            seat: 1,
            price: 350,
          },
        ],
      }),
    ).rejects.toThrow();
  });
});
