import { getDirection } from './getDirection';

describe('getDirection', () => {
  let host: HTMLElement;
  let target: HTMLElement;

  beforeEach(() => {
    host = document.createElement('div');
    target = document.createElement('div');
    document.body.appendChild(host);
    document.body.appendChild(target);
  });

  afterEach(() => {
    host.remove();
    target.remove();
  });

  it('should return "ltr" if dir attribute is "ltr"', () => {
    target.setAttribute('dir', 'ltr');
    expect(getDirection(host, target)).toBe('ltr');
  });

  it('should return "rtl" if dir attribute is "rtl"', () => {
    target.setAttribute('dir', 'rtl');
    expect(getDirection(host, target)).toBe('rtl');
  });

  it('should return "ltr" if dir attribute is missing and computed style is "ltr"', () => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ direction: 'ltr' }),
      configurable: true,
    });
    expect(getDirection(host, target)).toBe('ltr');
  });

  it('should return "rtl" if dir attribute is missing and computed style is "rtl"', () => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ direction: 'rtl' }),
      configurable: true,
    });
    expect(getDirection(host, target)).toBe('rtl');
  });

  it('should prioritize dir attribute over computed style', () => {
    target.setAttribute('dir', 'rtl');
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ direction: 'ltr' }),
      configurable: true,
    });
    expect(getDirection(host, target)).toBe('rtl');
  });
});
