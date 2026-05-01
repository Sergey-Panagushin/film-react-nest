import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  const filmsServiceMock = {
    findAll: jest.fn().mockResolvedValue({ total: 0, items: [] }),
    findSchedule: jest.fn().mockResolvedValue({ total: 0, items: [] }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(filmsServiceMock)
      .compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('контроллер должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  it('метод findAll должен вызывать сервис и возвращать список фильмов', async () => {
    const result = await controller.findAll();
    expect(filmsServiceMock.findAll).toHaveBeenCalled();
    expect(result).toEqual({ total: 0, items: [] });
  });

  it('метод findSchedule должен вызывать сервис с переданным id', async () => {
    const id = 'test-id';
    const result = await controller.findSchedule(id);
    expect(filmsServiceMock.findSchedule).toHaveBeenCalledWith(id);
    expect(result).toEqual({ total: 0, items: [] });
  });
});