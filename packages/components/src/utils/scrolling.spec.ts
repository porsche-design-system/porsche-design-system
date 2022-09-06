import { getScrollActivePosition, getScrollByX } from './scrolling';
import * as scrollerUtils from '../components/common/scroller/scroller-utils';

xdescribe('scrollElementTo()', () => {});
xdescribe('scrollElementBy()', () => {});

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
  const scrollerElement = document.createElement('p-scroller');
  let scrollAreaElement = document.createElement('div');
  scrollAreaElement = { ...scrollAreaElement, offsetWidth: 4 };
  let gradientElement = document.createElement('div');
  gradientElement = { ...gradientElement, offsetWidth: 20 };

  it('should call getScrollerElements() with correct parameter', () => {
    const spy = jest.spyOn(scrollerUtils, 'getScrollerElements').mockReturnValue([scrollAreaElement, gradientElement]);

    getScrollActivePosition([], 'next', 0, scrollerElement);
    expect(spy).toBeCalledWith(scrollerElement);
  });

  it('should return scrollActivePosition = 16 if scrolling to last tab', () => {
    jest.spyOn(scrollerUtils, 'getScrollerElements').mockReturnValue([scrollAreaElement, gradientElement]);
    expect(
      getScrollActivePosition([{ offsetLeft: 20, offsetWidth: 0 }] as HTMLElement[], 'next', 0, scrollerElement)
    ).toBe(16);
  });

  it('should return 8 if direction is "next" and next tab is set as active', () => {
    jest.spyOn(scrollerUtils, 'getScrollerElements').mockReturnValue([scrollAreaElement, gradientElement]);
    expect(
      getScrollActivePosition(
        [
          { offsetLeft: 20, offsetWidth: 0 },
          { offsetLeft: 0, offsetWidth: 0 },
        ] as HTMLElement[],
        'next',
        0,
        scrollerElement
      )
    ).toBe(8);
  });

  it('should return 0 if direction is "prev" and first tab is set as active', () => {
    jest.spyOn(scrollerUtils, 'getScrollerElements').mockReturnValue([scrollAreaElement, gradientElement]);
    expect(
      getScrollActivePosition([{ offsetLeft: 0, offsetWidth: 0 }] as HTMLElement[], 'prev', 0, scrollerElement)
    ).toBe(0);
  });

  it('should return 41 if scrolling to previous tab', () => {
    jest.spyOn(scrollerUtils, 'getScrollerElements').mockReturnValue([scrollAreaElement, gradientElement]);
    expect(
      getScrollActivePosition(
        [
          { offsetLeft: 0, offsetWidth: 0 },
          { offsetLeft: 20, offsetWidth: 5 },
        ] as HTMLElement[],
        'prev',
        1,
        scrollerElement
      )
    ).toBe(41);
  });
});
