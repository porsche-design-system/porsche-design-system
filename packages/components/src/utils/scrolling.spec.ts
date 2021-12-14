import { getScrollByX } from './scrolling';

describe('getScrollByX()', () => {
  const data: [HTMLElement, number][] = [
    [{ offsetWidth: 0 } as HTMLElement, 0],
    [{ offsetWidth: 100 } as HTMLElement, 20],
    [{ offsetWidth: 500 } as HTMLElement, 100],
  ];
  it.each(data)('should for %s return %s', (params, result) => {
    expect(getScrollByX(params)).toBe(result);
  });
});
