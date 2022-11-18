import type { ScrollerDirection } from './scroller-utils';
import { getScrollerElements, getScrollPositionAfterPrevNextClick, isScrollable } from './scroller-utils';
import * as getHTMLElementsUtils from '../../utils/dom/getHTMLElements';

describe('getScrollPositionAfterPrevNextClick()', () => {
  it.each<[number, number, ScrollerDirection, number]>([
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

describe('getScrollerElements()', () => {
  it('should call getHTMLElements() with correct parameters', () => {
    const spy = jest.spyOn(getHTMLElementsUtils, 'getHTMLElements');
    const scroller = document.createElement('p-scroller');
    scroller.attachShadow({ mode: 'open' });

    getScrollerElements(scroller);
    expect(spy).toBeCalledWith(scroller.shadowRoot, '.scroll-area,.action-prev');
  });

  it('should return tuple result of getHTMLElements()', () => {
    const mockResult1 = document.createElement('div');
    mockResult1.id = 'mock-result-1';
    const mockResult2 = document.createElement('div');
    mockResult2.id = 'mock-result-2';
    jest.spyOn(getHTMLElementsUtils, 'getHTMLElements').mockReturnValue([mockResult1, mockResult2]);

    const scroller = document.createElement('p-scroller');
    scroller.attachShadow({ mode: 'open' });

    expect(getScrollerElements(scroller)).toEqual([mockResult1, mockResult2]);
  });
});

describe('isScrollable()', () => {
  it.each<[{ isPrevHidden: boolean; isNextHidden: boolean }, boolean]>([
    [{ isPrevHidden: true, isNextHidden: true }, false],
    [{ isPrevHidden: false, isNextHidden: false }, true],
    [{ isPrevHidden: false, isNextHidden: true }, true],
    [{ isPrevHidden: true, isNextHidden: false }, true],
  ])('should for %o return %s', ({ isPrevHidden, isNextHidden }, expected) => {
    expect(isScrollable(isPrevHidden, isNextHidden)).toBe(expected);
  });
});
