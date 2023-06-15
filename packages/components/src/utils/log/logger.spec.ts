import { consoleError, consoleWarn, throwException } from './logger';

const messagePrefix = '[Porsche Design System]';

describe('consoleWarn()', () => {
  it('should call console.warn() with correct parameters', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation();

    consoleWarn('a message');
    expect(spy).toBeCalledWith(messagePrefix, 'a message');

    consoleWarn('a message', 'and another one');
    expect(spy).toBeCalledWith(messagePrefix, 'a message', 'and another one');
  });
});

describe('consoleError()', () => {
  it('should call console.error() with correct parameters', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();

    consoleError('a message');
    expect(spy).toBeCalledWith(messagePrefix, 'a message');

    consoleError('a message', 'and another one');
    expect(spy).toBeCalledWith(messagePrefix, 'a message', 'and another one');
  });
});

describe('throwException()', () => {
  it('should throw a new Error with correct parameters', () => {
    expect(() => throwException('a message')).toThrowErrorMatchingInlineSnapshot(`"${messagePrefix} a message"`);
  });
});
