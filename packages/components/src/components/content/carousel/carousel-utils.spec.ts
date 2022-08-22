import {
  getAmountOfPages,
  getSlides,
  getSplideBreakpoints,
  isFirstPage,
  isLastPage,
  renderPagination,
  slideNext,
  slidePrev,
  toSplideBreakpoints,
  updatePagination,
  updatePrevNextButtonAria,
  warnIfHeadingIsMissing,
} from './carousel-utils';
import * as carouselUtils from './carousel-utils';
import * as jssUtils from '../../../utils/jss';
import * as hasNamedSlotUtils from '../../../utils/dom/hasNamedSlot';
import type { Splide } from '@splidejs/splide';
import { ButtonPure } from '../../action/button-pure/button-pure';

describe('getSplideBreakpoints()', () => {
  it('should call toSplideBreakpoints() with correct parameters', () => {
    const spy = jest.spyOn(carouselUtils, 'toSplideBreakpoints');
    getSplideBreakpoints(3);

    expect(spy).toBeCalledWith('perPage', 3);
  });

  it('should call mergeDeep() with results of toSplideBreakpoints() calls', () => {
    const spy = jest.spyOn(jssUtils, 'mergeDeep');
    const mockResult = { 0: { perPage: 5 } };
    jest.spyOn(carouselUtils, 'toSplideBreakpoints').mockReturnValue(mockResult);

    getSplideBreakpoints(1);
    expect(spy).toBeCalledWith(mockResult);
  });
});

describe('toSplideBreakpoints()', () => {
  it('should return correct correct object for flat BreakpointCustomizable parameter', () => {
    expect(toSplideBreakpoints('perPage', 10)).toEqual({ 0: { perPage: 10 } });
    expect(toSplideBreakpoints('perMove', 2)).toEqual({ 0: { perMove: 2 } });
  });

  it('should return correct breakpoints object for nested BreakpointCustomizable parameter', () => {
    expect(toSplideBreakpoints('perPage', { base: 5, s: 10 })).toEqual({
      0: { perPage: 5 },
      760: { perPage: 10 },
    });
    expect(toSplideBreakpoints('perMove', { base: 1, xs: 2, s: 3, m: 4, l: 5, xl: 6 })).toEqual({
      0: { perMove: 1 },
      480: { perMove: 2 },
      760: { perMove: 3 },
      1000: { perMove: 4 },
      1300: { perMove: 5 },
      1760: { perMove: 6 },
    });
  });
});

describe('warnIfHeadingIsMissing()', () => {
  it('should call hasNamedSlot() with correct parameters', () => {
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const spy = jest.spyOn(hasNamedSlotUtils, 'hasNamedSlot');
    const host = document.createElement('p-carousel');

    warnIfHeadingIsMissing(host, '');
    expect(spy).toBeCalledWith(host, 'heading');
  });

  it('should call console.warn with correct parameter if heading prop is not set or slotted heading does not exist', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    jest.spyOn(hasNamedSlotUtils, 'hasNamedSlot').mockReturnValue(false);
    const host = document.createElement('p-carousel');

    warnIfHeadingIsMissing(host, undefined);
    expect(spy).toBeCalledWith(
      'A heading has to be set via property or named slot on p-carousel in order to ensure accessibility.'
    );

    warnIfHeadingIsMissing(host, null);
    expect(spy).toBeCalledTimes(2);

    warnIfHeadingIsMissing(host, '');
    expect(spy).toBeCalledTimes(3);
  });

  it('should not call console.warn if heading prop is set', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const host = document.createElement('p-carousel');

    warnIfHeadingIsMissing(host, 'some heading');
    expect(spy).not.toBeCalled();
  });

  it('should not call console.warn if slotted heading exists', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    jest.spyOn(hasNamedSlotUtils, 'hasNamedSlot').mockReturnValue(true);
    const host = document.createElement('p-carousel');

    warnIfHeadingIsMissing(host, '');
    expect(spy).not.toBeCalled();
  });
});

describe('getSlides()', () => {
  const getChildren = (): HTMLElement[] => {
    const child1 = document.createElement('div');
    child1.id = 'child1';

    const child2 = document.createElement('span');
    child2.id = 'child2';

    const child3 = document.createElement('p');
    child3.id = 'child3';

    return [child1, child2, child3];
  };

  it('should return parameters children as array ', () => {
    const host = document.createElement('p-carousel');
    expect(getSlides(host)).toEqual([]);

    const children = getChildren();
    host.append(...children);
    expect(getSlides(host)).toEqual(children);
  });

  it('should not return parameters children with slot="heading"', () => {
    const host = document.createElement('p-carousel');

    const [child1, child2, child3] = getChildren();
    child2.slot = 'heading';

    host.append(child1, child2, child3);
    expect(getSlides(host)).toEqual([child1, child3]);
  });

  it('should add incremental slot="slide-x" attribute on each child', () => {
    const host = document.createElement('p-carousel');
    const children = getChildren();
    host.append(...children);

    const result = getSlides(host);
    result.forEach((child, i) => {
      expect(child.slot).toBe(`slide-${i}`);
    });
  });
});

describe('getAmountOfPages()', () => {
  it.each<[number, number, number]>([
    [0, 1, 0],
    [0, 2, 0],
    [0, 3, 0],
    [1, 1, 1],
    [2, 1, 2],
    [3, 1, 3],
    [2, 2, 1],
    [3, 2, 2],
    [4, 2, 3],
    [5, 2, 4],
    [6, 2, 5],
    [7, 2, 6],
    [3, 3, 1],
    [4, 3, 2],
    [5, 3, 3],
    [6, 3, 4],
    [7, 3, 5],
    [1, 4, 1],
    [2, 4, 1],
    [3, 4, 1],
    [4, 4, 1],
    [5, 4, 2],
    [6, 4, 3],
  ])('should for amountOfSlides: %s and slidesPerPage: %s return: %s', (amountOfSlides, slidesPerPage, result) => {
    expect(getAmountOfPages(amountOfSlides, slidesPerPage)).toBe(result);
  });
});

describe('isFirstPage()', () => {
  it('should return true if splide.index === 0', () => {
    expect(isFirstPage({ index: 0 } as Splide)).toBe(true);
  });

  it('should return false for splide.index !== 0', () => {
    expect(isFirstPage({ index: 1 } as Splide)).toBe(false);
    expect(isFirstPage({ index: 2 } as Splide)).toBe(false);
    expect(isFirstPage({ index: 5 } as Splide)).toBe(false);
  });
});

describe('isLastPage()', () => {
  it('should return true for splide.index >= amountOfPages - 1', () => {
    expect(isLastPage({ index: 0 } as Splide, 1)).toBe(true);
    expect(isLastPage({ index: 1 } as Splide, 1)).toBe(true);
    expect(isLastPage({ index: 1 } as Splide, 2)).toBe(true);

    expect(isLastPage({ index: 4 } as Splide, 5)).toBe(true);
    expect(isLastPage({ index: 5 } as Splide, 5)).toBe(true);
    expect(isLastPage({ index: 6 } as Splide, 5)).toBe(true);
  });

  it('should return false for splide.index < amountOfPages - 1', () => {
    expect(isLastPage({ index: 0 } as Splide, 2)).toBe(false);

    expect(isLastPage({ index: 0 } as Splide, 5)).toBe(false);
    expect(isLastPage({ index: 1 } as Splide, 5)).toBe(false);
    expect(isLastPage({ index: 2 } as Splide, 5)).toBe(false);
    expect(isLastPage({ index: 3 } as Splide, 5)).toBe(false);
  });
});

describe('slidePrev()', () => {
  it('should call isFirstPage() with correct parameter', () => {
    const spy = jest.spyOn(carouselUtils, 'isFirstPage');
    const splide = { index: 1, go: (_: string | number) => {} } as Splide;
    slidePrev(splide, 5);

    expect(spy).toBeCalledWith(splide);
  });

  it.each<[number, number, string | number]>([
    [5, 5, 3],
    [4, 5, '<'],
    [3, 5, '<'],
    [2, 5, '<'],
    [1, 5, '<'],
    [0, 5, 4],
    [1, 2, '<'],
    [0, 2, 1],
  ])(
    'should for splide.index: %s and amountOfPages: %s call splide.go() with: %s',
    (index, amountOfPages, expected) => {
      const go: (page: string | number) => Splide = jest.fn();
      const splide = { index, go } as Splide;

      slidePrev(splide, amountOfPages);
      expect(go).toBeCalledWith(expected);
    }
  );
});

describe('slideNext()', () => {
  it('should call isLastPage() with correct parameter', () => {
    const spy = jest.spyOn(carouselUtils, 'isLastPage');
    const splide = { index: 1, go: (_: string | number) => {} } as Splide;
    slideNext(splide, 5);

    expect(spy).toBeCalledWith(splide, 5);
  });

  it.each<[number, number, string | number]>([
    [0, 5, '>'],
    [1, 5, '>'],
    [2, 5, '>'],
    [3, 5, '>'],
    [4, 5, 0],
    [5, 5, 0],
  ])(
    'should for splide.index: %s and amountOfPages: %s call splide.go() with: %s',
    (index, amountOfPages, expected) => {
      const go: (page: string | number) => Splide = jest.fn();
      const splide = { index, go } as Splide;

      slideNext(splide, amountOfPages);
      expect(go).toBeCalledWith(expected);
    }
  );
});

describe('updatePrevNextButtonAria()', () => {
  const getButtons = (): [ButtonPure, ButtonPure] => {
    const btnPrev = document.createElement('button') as HTMLButtonElement & ButtonPure;
    btnPrev.id = 'btnPrev';
    const btnNext = document.createElement('button') as HTMLButtonElement & ButtonPure;
    btnNext.id = 'btnNext';

    return [btnPrev, btnNext];
  };

  const getSplide = (): Splide =>
    ({
      index: 1,
      length: 3,
      options: {
        i18n: {
          next: 'custom next',
          prev: 'custom prev',
          last: 'custom last',
          first: 'custom first',
        } as Splide['options']['i18n'],
        perPage: 1,
      },
    } as Splide);

  it('should call isFirstPage() with correct parameter', () => {
    const spy = jest.spyOn(carouselUtils, 'isFirstPage');
    const splide = getSplide();

    updatePrevNextButtonAria(...getButtons(), splide);
    expect(spy).toBeCalledWith(splide);
  });

  it('should call isLastPage() with correct parameters', () => {
    const spy = jest.spyOn(carouselUtils, 'isLastPage');
    jest.spyOn(carouselUtils, 'getAmountOfPages').mockReturnValue(5);
    const splide = getSplide();

    updatePrevNextButtonAria(...getButtons(), splide);
    expect(spy).toBeCalledWith(splide, 5);
  });

  it('should call getAmountOfPages() with correct parameters', () => {
    const spy = jest.spyOn(carouselUtils, 'getAmountOfPages');
    const splide = getSplide();

    updatePrevNextButtonAria(...getButtons(), splide);
    expect(spy).toBeCalledWith(3, 1);
  });

  it('should correctly set aria property on btnNext and btnPrev parameter', () => {
    const isFirstPageSpy = jest.spyOn(carouselUtils, 'isFirstPage');
    const isLastPageSpy = jest.spyOn(carouselUtils, 'isLastPage');
    const [btnPrev, btnNext] = getButtons();
    const splide = getSplide();

    isFirstPageSpy.mockReturnValue(false);
    isLastPageSpy.mockReturnValue(false);
    updatePrevNextButtonAria(btnPrev, btnNext, splide);
    expect(btnPrev.aria).toEqual({ 'aria-label': 'custom prev' });
    expect(btnNext.aria).toEqual({ 'aria-label': 'custom next' });

    isFirstPageSpy.mockReturnValue(true);
    isLastPageSpy.mockReturnValue(true);
    updatePrevNextButtonAria(btnPrev, btnNext, splide);
    expect(btnPrev.aria).toEqual({ 'aria-label': 'custom last' });
    expect(btnNext.aria).toEqual({ 'aria-label': 'custom first' });
  });
});

const bulletMarkup = '<span class="bullet"></span>';
const bulletActiveMarkup = '<span class="bullet bullet--active"></span>';

describe('renderPagination()', () => {
  it('should render correct children of pagination', () => {
    const el = document.createElement('div');

    renderPagination(el, 1, -1);
    expect(el.innerHTML).toBe(bulletMarkup);

    renderPagination(el, 2, -1);
    expect(el.innerHTML).toBe([bulletMarkup, bulletMarkup].join(''));

    renderPagination(el, 3, -1);
    expect(el.innerHTML).toBe([bulletMarkup, bulletMarkup, bulletMarkup].join(''));
  });

  it('should render correct children of pagination with activeIndex', () => {
    const el = document.createElement('div');

    renderPagination(el, 1, 0);
    expect(el.innerHTML).toBe(bulletActiveMarkup);

    renderPagination(el, 2, 1);
    expect(el.innerHTML).toBe([bulletMarkup, bulletActiveMarkup].join(''));

    renderPagination(el, 3, 1);
    expect(el.innerHTML).toBe([bulletMarkup, bulletActiveMarkup, bulletMarkup].join(''));
  });
});

describe('updatePagination()', () => {
  it('should remove bullet--active class from child', () => {
    const el = document.createElement('div');
    el.innerHTML = [bulletMarkup, bulletMarkup, bulletActiveMarkup].join('');
    const spy = jest.spyOn(el.children[2].classList, 'remove');

    expect(el.children[2].outerHTML).toBe(bulletActiveMarkup);
    updatePagination(el, 0);
    expect(spy).toBeCalledWith('bullet--active');
    expect(el.children[2].outerHTML).toBe(bulletMarkup);
  });

  it('should add bullet--active class to child on newIndex', () => {
    const el = document.createElement('div');
    el.innerHTML = [bulletMarkup, bulletActiveMarkup, bulletMarkup].join('');
    const spy = jest.spyOn(el.children[2].classList, 'add');

    expect(el.children[2].outerHTML).toBe(bulletMarkup);
    updatePagination(el, 2);
    expect(spy).toBeCalledWith('bullet--active');
    expect(el.children[2].outerHTML).toBe(bulletActiveMarkup);
  });
});
