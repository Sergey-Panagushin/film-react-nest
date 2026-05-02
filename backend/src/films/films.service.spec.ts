import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  const filmsRepositoryMock = {
    findAll: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository,
          useValue: filmsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('сервис должен быть определён', () => {
    expect(service).toBeDefined();
  });

  it('метод findAll должен возвращать список фильмов с total', async () => {
    const result = await service.findAll();
    expect(result).toEqual({ total: 0, items: [] });
  });
});
