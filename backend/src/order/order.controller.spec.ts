import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;

  const orderServiceMock = {
    create: jest.fn().mockResolvedValue({ total: 1, items: [] }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(orderServiceMock)
      .compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('контроллер должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  it('метод create должен вызывать сервис с переданными данными', async () => {
    const dto = {
      email: 'test@test.ru',
      phone: '+7 (000) 000-00-00',
      tickets: [],
    };
    const result = await controller.create(dto);
    expect(orderServiceMock.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ total: 1, items: [] });
  });
});
