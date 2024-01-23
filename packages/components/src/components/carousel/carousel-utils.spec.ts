import * as carouselUtils from './carousel-utils';
import {
  getAmountOfPages,
  getSlidesAndAddAttributes,
  getSplideBreakpoints,
  isFirstPage,
  isLastPage,
  renderPagination,
  slideNext,
  slidePrev,
  updatePagination,
  updatePrevNextButtons,
} from './carousel-utils';
import type { Splide } from '@splidejs/splide';
import { ButtonPure } from '../button-pure/button-pure';

describe('getSplideBreakpoints()', () => {
  it('should return correct result for flat BreakpointCustomizable parameter', () => {
    expect(getSplideBreakpoints(10)).toEqual({ 0: { perPage: 10 } });
  });

  it('should return correct result for nested BreakpointCustomizable parameter', () => {
    expect(getSplideBreakpoints({ base: 5, s: 10 })).toEqual({
      0: { perPage: 5 },
      760: { perPage: 10 },
    });
  });

  it('should return correct result for nested floating number BreakpointCustomizable parameter', () => {
    expect(getSplideBreakpoints({ base: 2.2, xs: 2.5, s: 2.9 })).toEqual({
      0: { perPage: 2 },
      480: { perPage: 3 },
      760: { perPage: 3 },
    });
  });
});

describe('getSlidesAndAddAttributes()', () => {
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
    expect(getSlidesAndAddAttributes(host)).toEqual([]);

    const children = getChildren();
    host.append(...children);
    expect(getSlidesAndAddAttributes(host)).toEqual(children);
  });

  it('should not return parameters children with slot="heading" or slot="post-heading"', () => {
    const host = document.createElement('p-carousel');

    const [child1, child2, child3] = getChildren();
    child2.slot = 'heading';
    child3.slot = 'description';

    host.append(child1, child2, child3);
    expect(getSlidesAndAddAttributes(host)).toEqual([child1]);
  });

  it('should add incremental slot="slide-x" and tabindex="0" properties and attributes on each child', () => {
    const host = document.createElement('p-carousel');
    const children = getChildren();
    host.append(...children);

    const result = getSlidesAndAddAttributes(host);
    result.forEach((child, i) => {
      expect(child.slot).toBe(`slide-${i}`);
      expect(child.tabIndex).toBe(0);
      expect(child.getAttribute('slot')).toBe(`slide-${i}`);
      expect(child.getAttribute('tabindex')).toBe('0');
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
  }) as Splide;

describe('updatePrevNextButtons()', () => {
  const getButtons = (): [ButtonPure, ButtonPure] => {
    const btnPrev = document.createElement('button') as HTMLButtonElement & ButtonPure;
    btnPrev.id = 'btnPrev';
    const btnNext = document.createElement('button') as HTMLButtonElement & ButtonPure;
    btnNext.id = 'btnNext';

    return [btnPrev, btnNext];
  };

  it('should call isFirstPage() with correct parameter', () => {
    const spy = jest.spyOn(carouselUtils, 'isFirstPage');
    const splide = getSplide();

    updatePrevNextButtons(...getButtons(), splide);
    expect(spy).toBeCalledWith(splide);
  });

  it('should call isLastPage() with correct parameters', () => {
    const spy = jest.spyOn(carouselUtils, 'isLastPage');
    jest.spyOn(carouselUtils, 'getAmountOfPages').mockReturnValue(5);
    const splide = getSplide();

    updatePrevNextButtons(...getButtons(), splide);
    expect(spy).toBeCalledWith(splide, 5);
  });

  it('should call getAmountOfPages() with correct parameters', () => {
    const spy = jest.spyOn(carouselUtils, 'getAmountOfPages');
    const splide = getSplide();

    updatePrevNextButtons(...getButtons(), splide);
    expect(spy).toBeCalledWith(3, 1);
  });

  it('should correctly set aria property on btnNext and btnPrev parameter', () => {
    const isFirstPageSpy = jest.spyOn(carouselUtils, 'isFirstPage');
    const isLastPageSpy = jest.spyOn(carouselUtils, 'isLastPage');
    const [btnPrev, btnNext] = getButtons();
    const splide = getSplide();

    isFirstPageSpy.mockReturnValue(false);
    isLastPageSpy.mockReturnValue(false);
    updatePrevNextButtons(btnPrev, btnNext, splide);
    expect(btnPrev.aria).toEqual({ 'aria-label': 'custom prev' });
    expect(btnNext.aria).toEqual({ 'aria-label': 'custom next' });

    isFirstPageSpy.mockReturnValue(true);
    isLastPageSpy.mockReturnValue(true);
    updatePrevNextButtons(btnPrev, btnNext, splide);
    expect(btnPrev.aria).toEqual({ 'aria-label': 'custom last' });
    expect(btnNext.aria).toEqual({ 'aria-label': 'custom first' });
  });

  it('should correctly set disabled property on btnNext and btnPrev parameter', () => {
    const isFirstPageSpy = jest.spyOn(carouselUtils, 'isFirstPage');
    const isLastPageSpy = jest.spyOn(carouselUtils, 'isLastPage');
    const [btnPrev, btnNext] = getButtons();
    const splide = getSplide();

    isFirstPageSpy.mockReturnValue(false);
    isLastPageSpy.mockReturnValue(false);
    updatePrevNextButtons(btnPrev, btnNext, splide);
    expect(btnPrev.disabled).toEqual(false);
    expect(btnNext.disabled).toEqual(false);

    isFirstPageSpy.mockReturnValue(true);
    isLastPageSpy.mockReturnValue(true);
    updatePrevNextButtons(btnPrev, btnNext, splide);
    expect(btnPrev.disabled).toEqual(true);
    expect(btnNext.disabled).toEqual(true);
  });
});

const bulletMarkup = '<span class="bullet"></span>';
const bulletActiveMarkup = '<span class="bullet bullet--active"></span>';
const bulletInfiniteMarkup = '<span class="bullet bullet--infinite"></span>';

describe('renderPagination()', () => {
  const splide = getSplide();
  it('should render correct children of pagination', () => {
    const el = document.createElement('div');

    renderPagination(el, 1, -1, splide);
    expect(el.innerHTML).toBe(bulletMarkup);

    renderPagination(el, 2, -1, splide);
    expect(el.innerHTML).toBe([bulletMarkup, bulletMarkup].join(''));

    renderPagination(el, 3, -1, splide);
    expect(el.innerHTML).toBe([bulletMarkup, bulletMarkup, bulletMarkup].join(''));
  });

  it('should render correct children of pagination with activeIndex', () => {
    const el = document.createElement('div');

    renderPagination(el, 1, 0, splide);
    expect(el.innerHTML).toBe(bulletActiveMarkup);

    renderPagination(el, 2, 1, splide);
    expect(el.innerHTML).toBe([bulletMarkup, bulletActiveMarkup].join(''));

    renderPagination(el, 3, 1, splide);
    expect(el.innerHTML).toBe([bulletMarkup, bulletActiveMarkup, bulletMarkup].join(''));
  });

  it('should render correct children of pagination when using less or equal than 5 slides', () => {
    const el = document.createElement('div');

    renderPagination(el, 4, 0, splide);
    expect(el.innerHTML).toBe([bulletActiveMarkup, bulletMarkup, bulletMarkup, bulletMarkup].join(''));

    renderPagination(el, 5, 0, splide);
    expect(el.innerHTML).toBe([bulletActiveMarkup, bulletMarkup, bulletMarkup, bulletMarkup, bulletMarkup].join(''));
  });

  it('should render correct children of pagination when using more than 5 slides', () => {
    const el = document.createElement('div');

    renderPagination(el, 6, 0, splide);
    expect(el.innerHTML).toBe(
      [bulletActiveMarkup, bulletMarkup, bulletMarkup, bulletMarkup, bulletInfiniteMarkup, bulletMarkup].join('')
    );

    renderPagination(el, 6, 1, splide);
    expect(el.innerHTML).toBe(
      [bulletMarkup, bulletActiveMarkup, bulletMarkup, bulletMarkup, bulletInfiniteMarkup, bulletMarkup].join('')
    );

    renderPagination(el, 6, 2, splide);
    expect(el.innerHTML).toBe(
      [bulletInfiniteMarkup, bulletMarkup, bulletActiveMarkup, bulletMarkup, bulletInfiniteMarkup, bulletMarkup].join(
        ''
      )
    );

    renderPagination(el, 6, 3, splide);
    expect(el.innerHTML).toBe(
      [bulletMarkup, bulletInfiniteMarkup, bulletMarkup, bulletActiveMarkup, bulletMarkup, bulletInfiniteMarkup].join(
        ''
      )
    );

    renderPagination(el, 6, 4, splide);
    expect(el.innerHTML).toBe(
      [bulletMarkup, bulletInfiniteMarkup, bulletMarkup, bulletMarkup, bulletActiveMarkup, bulletMarkup].join('')
    );

    renderPagination(el, 6, 5, splide);
    expect(el.innerHTML).toBe(
      [bulletMarkup, bulletInfiniteMarkup, bulletMarkup, bulletMarkup, bulletMarkup, bulletActiveMarkup].join('')
    );
  });
});

describe('updatePagination()', () => {
  it('should remove bullet--active class from child', () => {
    const el = document.createElement('div');
    el.innerHTML = [bulletMarkup, bulletMarkup, bulletActiveMarkup].join('');

    expect(el.children[2].outerHTML).toBe(bulletActiveMarkup);
    expect(el.children[2].classList).toContain('bullet--active');

    updatePagination(el, 3, 0);
    expect(el.children[2].outerHTML).toBe(bulletMarkup);
    expect(el.children[2].outerHTML).not.toContain('bullet--active');
  });

  it('should add bullet--active class to child on newIndex', () => {
    const el = document.createElement('div');
    el.innerHTML = [bulletMarkup, bulletActiveMarkup, bulletMarkup].join('');

    expect(el.children[2].outerHTML).toBe(bulletMarkup);
    expect(el.children[2].classList).not.toContain('bullet--active');

    updatePagination(el, 3, 2);
    expect(el.children[2].outerHTML).toBe(bulletActiveMarkup);
    expect(el.children[2].classList).toContain('bullet--active');
  });

  it('should update bullet classes when using more than 5 slides at start', () => {
    const el = document.createElement('div');
    el.innerHTML = [
      bulletMarkup,
      bulletActiveMarkup,
      bulletMarkup,
      bulletMarkup,
      bulletInfiniteMarkup,
      bulletMarkup,
    ].join('');

    expect(el.children[0].outerHTML).toBe(bulletMarkup);
    expect(el.children[1].outerHTML).toBe(bulletActiveMarkup);
    expect(el.children[2].outerHTML).toBe(bulletMarkup);

    updatePagination(el, 6, 2);
    expect(el.children[0].outerHTML).toBe(bulletInfiniteMarkup);
    expect(el.children[1].outerHTML).toBe(bulletMarkup);
    expect(el.children[2].outerHTML).toBe(bulletActiveMarkup);
  });

  it('should update bullet classes when using more than 5 slides at the middle', () => {
    const el = document.createElement('div');
    el.innerHTML = [
      bulletMarkup,
      bulletInfiniteMarkup,
      bulletMarkup,
      bulletActiveMarkup,
      bulletMarkup,
      bulletInfiniteMarkup,
      bulletMarkup,
    ].join('');

    expect(el.children[1].outerHTML).toBe(bulletInfiniteMarkup);
    expect(el.children[2].outerHTML).toBe(bulletMarkup);
    expect(el.children[3].outerHTML).toBe(bulletActiveMarkup);
    expect(el.children[4].outerHTML).toBe(bulletMarkup);
    expect(el.children[5].outerHTML).toBe(bulletInfiniteMarkup);

    updatePagination(el, 7, 4);
    expect(el.children[2].outerHTML).toBe(bulletInfiniteMarkup);
    expect(el.children[3].outerHTML).toBe(bulletMarkup);
    expect(el.children[4].outerHTML).toBe(bulletActiveMarkup);
    expect(el.children[5].outerHTML).toBe(bulletMarkup);
    expect(el.children[6].outerHTML).toBe(bulletInfiniteMarkup);
  });

  it('should update bullet classes when using more than 5 slides at end', () => {
    const el = document.createElement('div');
    el.innerHTML = [
      bulletMarkup,
      bulletInfiniteMarkup,
      bulletMarkup,
      bulletMarkup,
      bulletActiveMarkup,
      bulletMarkup,
    ].join('');

    expect(el.children[5].outerHTML).toBe(bulletMarkup);
    expect(el.children[4].outerHTML).toBe(bulletActiveMarkup);
    expect(el.children[3].outerHTML).toBe(bulletMarkup);

    updatePagination(el, 6, 3);
    expect(el.children[5].outerHTML).toBe(bulletInfiniteMarkup);
    expect(el.children[4].outerHTML).toBe(bulletMarkup);
    expect(el.children[3].outerHTML).toBe(bulletActiveMarkup);
  });
});
