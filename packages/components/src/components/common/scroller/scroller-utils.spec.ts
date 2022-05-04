import type { Direction } from './scroller-utils';
import { getScrollActivePosition, getScrollPositionAfterPrevNextClick } from './scroller-utils';

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

describe('getScrollPositionAfterPrevNextClick()', () => {
  it.each<[number, number, Direction, number]>([
    [100, 0, 'prev', -20],
    [100, 50, 'prev', 30],
    [100, 0, 'next', 20],
    [100, 50, 'next', 70],
    [100, 90, 'next', 110],
  ])(
    'should for offsetWidth: %s, scrollLeft: %s and direction: %s return %s',
    (offsetWidth, scrollLeft, direction, expected) => {
      expect(getScrollPositionAfterPrevNextClick({ offsetWidth, scrollLeft } as HTMLElement, direction)).toBe(expected);
    }
  );
});
