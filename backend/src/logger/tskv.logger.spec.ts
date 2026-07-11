import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('formatMessage возвращает TSKV-строку с tab-separated полями', () => {
    const result = logger.formatMessage('warn', 'slow query', 'db');

    expect(result).toBe('level=warn\tmessage=slow query\tparam0=db');
  });

  it('log пишет TSKV-строку в console.log', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => undefined);

    logger.log('started');

    expect(consoleSpy).toHaveBeenCalledWith('level=log\tmessage=started');

    consoleSpy.mockRestore();
  });

  it('error пишет TSKV-строку в console.error', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    logger.error('failed', 'details');

    expect(consoleSpy).toHaveBeenCalledWith(
      'level=error\tmessage=failed\tparam0=details',
    );

    consoleSpy.mockRestore();
  });
});
