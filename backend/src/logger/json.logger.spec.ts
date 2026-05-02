import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('должен форматировать сообщение в JSON формат', () => {
    const result = logger.formatMessage('log', 'тестовое сообщение');
    const parsed = JSON.parse(result);
    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('тестовое сообщение');
  });

  it('должен вызывать console.log при вызове метода log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logger.log('тестовое сообщение');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('должен вызывать console.error при вызове метода error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('сообщение об ошибке');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('должен вызывать console.warn при вызове метода warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('предупреждение');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('должен форматировать сообщение в TSKV формат', () => {
    const result = logger.formatMessage('log', 'тестовое сообщение');
    expect(result).toContain('level=log');
    expect(result).toContain('message=тестовое сообщение');
    expect(result).toContain('\t');
    expect(result).toContain('\n');
  });

  it('поля в TSKV должны разделяться табуляцией', () => {
    const result = logger.formatMessage('log', 'тест');
    const parts = result.trim().split('\t');
    expect(parts.length).toBeGreaterThanOrEqual(2);
  });

  it('должен записывать в stdout при вызове метода log', () => {
    const spy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
    logger.log('тестовое сообщение');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('должен записывать в stderr при вызове метода error', () => {
    const spy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);
    logger.error('сообщение об ошибке');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
