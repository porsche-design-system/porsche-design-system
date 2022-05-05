import type { Direction } from './scroller-utils';
import { getScrollPositionAfterPrevNextClick } from './scroller-utils';

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
