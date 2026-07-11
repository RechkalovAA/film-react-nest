import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('formatMessage возвращает JSON с level, message и optionalParams', () => {
    const result = logger.formatMessage('log', 'hello', 'ctx');

    expect(JSON.parse(result)).toEqual({
      level: 'log',
      message: 'hello',
      optionalParams: ['ctx'],
    });
  });

  it('log пишет отформатированное сообщение в console.log', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => undefined);

    logger.log('test message', 'extra');

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'test message',
        optionalParams: ['extra'],
      }),
    );

    consoleSpy.mockRestore();
  });

  it('error пишет отформатированное сообщение в console.error', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    logger.error('failure');

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        message: 'failure',
        optionalParams: [],
      }),
    );

    consoleSpy.mockRestore();
  });
});
