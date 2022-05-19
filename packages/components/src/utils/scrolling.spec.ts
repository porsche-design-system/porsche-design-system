import { getScrollActivePosition, getScrollByX } from './scrolling';

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

describe('getScrollActivePosition()', () => {
  it('should return scrollActivePosition = 16 if scrolling to last tab', () => {
    expect(
      getScrollActivePosition([{ offsetLeft: 20, offsetWidth: 0 }] as HTMLElement[], 'next', 0, undefined, undefined)
    ).toBe(16);
  });

  it('should return scrollActivePosition = 8 if direction is "next", next tab is set as active', () => {
    expect(
      getScrollActivePosition(
        [
          { offsetLeft: 20, offsetWidth: 0 },
          { offsetLeft: 0, offsetWidth: 0 },
        ] as HTMLElement[],
        'next',
        0,
        undefined,
        20
      )
    ).toBe(8);
  });

  it('should return scrollActivePosition = 0 if direction is "prev" and first tab is set as active', () => {
    expect(
      getScrollActivePosition([{ offsetLeft: 0, offsetWidth: 0 }] as HTMLElement[], 'prev', 0, undefined, undefined)
    ).toBe(0);
  });

  it('should return scrollActivePosition = 41 if scrolling to previous tab', () => {
    expect(
      getScrollActivePosition(
        [
          { offsetLeft: 0, offsetWidth: 0 },
          { offsetLeft: 20, offsetWidth: 5 },
        ] as HTMLElement[],
        'prev',
        1,
        4,
        20
      )
    ).toBe(41);
  });
});
