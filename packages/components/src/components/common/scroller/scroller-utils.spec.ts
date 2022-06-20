import type { Direction } from './scroller-utils';
import { getScrollerElements, getScrollPositionAfterPrevNextClick } from './scroller-utils';
import * as getShadowRootHTMLElementUtil from '../../../utils/dom/getShadowRootHTMLElement';
import * as getHTMLElementUtil from '../../../utils/dom/getHTMLElement';

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

describe('getScrollerElements()', () => {
  it('should call getShadowRootHTMLElement with correct selectors', () => {
    const spy = jest.spyOn(getShadowRootHTMLElementUtil, 'getShadowRootHTMLElement').mockImplementationOnce(() => {
      return {} as Element;
    });
    jest.spyOn(getHTMLElementUtil, 'getHTMLElement').mockImplementationOnce(() => {
      return {} as Element;
    });

    const scroller = document.createElement('p-scroller');
    getScrollerElements(scroller);

    expect(spy).toBeCalledWith(scroller, '.scroll-area');
    expect(spy).toBeCalledWith(scroller, '.gradient');
  });
});
