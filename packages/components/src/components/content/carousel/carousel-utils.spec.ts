import { getAmountOfPages, getSplideBreakpoints, toSplideBreakpoints } from './carousel-utils';
import * as carouselUtils from './carousel-utils';
import * as jssUtils from '../../../utils/jss';

describe('getSplideBreakpoints()', () => {
  it('should call toSplideBreakpoints() with correct parameters', () => {
    const spy = jest.spyOn(carouselUtils, 'toSplideBreakpoints');
    getSplideBreakpoints(3, 5);

    expect(spy).toBeCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, 'perPage', 3);
    expect(spy).toHaveBeenNthCalledWith(2, 'perMove', 5);
  });
  it('should call mergeDeep() with results of toSplideBreakpoints() calls', () => {
    const spy = jest.spyOn(jssUtils, 'mergeDeep');
    const mockResult1 = { 0: { perPage: 5 } };
    const mockResult2 = { 0: { perPage: 5 } };
    jest.spyOn(carouselUtils, 'toSplideBreakpoints').mockReturnValueOnce(mockResult1).mockReturnValueOnce(mockResult2);

    getSplideBreakpoints(1, 2);
    expect(spy).toBeCalledWith(mockResult1, mockResult2);
  });
});

describe('toSplideBreakpoints()', () => {
  it('should return correct correct object for flat BreakpointCustomizable parameter', () => {
    expect(toSplideBreakpoints('gap', 10)).toEqual({ 0: { gap: 10 } });
    expect(toSplideBreakpoints('perMove', 2)).toEqual({ 0: { perMove: 2 } });
  });

  it('should return correct breakpoints object for nested BreakpointCustomizable parameter', () => {
    expect(toSplideBreakpoints('gap', { base: 5, s: 10 })).toEqual({
      0: { gap: 5 },
      760: { gap: 10 },
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

describe('getAmountOfPages()', () => {
  it.each<[number, number, number]>([
    [1, 1, 1],
    [2, 1, 2],
    [3, 1, 3],
    [2, 2, 1],
    [3, 2, 2],
    [4, 2, 2],
    [5, 2, 3],
    [6, 2, 3],
    [7, 2, 4],
    [3, 3, 1],
    [4, 3, 2],
    [5, 3, 2],
    [6, 3, 2],
    [7, 3, 3],
    [1, 4, 1],
    [2, 4, 1],
    [3, 4, 1],
    [4, 4, 1],
    [5, 4, 2],
  ])('should for amountOfSlides: %s and slidesPerPage: %s return: %s', (amountOfSlides, slidesPerPage, result) => {
    expect(getAmountOfPages(amountOfSlides, slidesPerPage)).toBe(result);
  });
});

xdescribe('getAmountOfSlides()', () => {});
xdescribe('isFirstPage()', () => {});
xdescribe('isLastPage()', () => {});
xdescribe('slidePrev()', () => {});
xdescribe('slideNext()', () => {});
xdescribe('updatePrevNextButtonAria()', () => {});
xdescribe('updatePagination()', () => {});
