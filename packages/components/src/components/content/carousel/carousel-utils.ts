import type { Options } from '@splidejs/splide';
import type { ResponsiveOptions } from '@splidejs/splide';
import type { BreakpointCustomizable, BreakpointKey } from '../../../types';
import { mergeDeep } from '../../../utils';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import type { Splide } from '@splidejs/splide';
import { ButtonPure } from '../../action/button-pure/button-pure';
import { bulletActiveClass } from './carousel-styles';

export type CarouselI18n = Partial<Pick<Options['i18n'], 'slideLabel' | 'prev' | 'next' | 'first' | 'last'>>;
export type CarouselChangeEvent = { activeIndex: number; previousIndex: number };

type ResponsiveOpts = Pick<ResponsiveOptions, 'perPage' | 'perMove'>;
type ResponsiveOptsKey = keyof ResponsiveOpts;
export type SplideBreakpoints = Options['breakpoints'];

export const getSplideBreakpoints = (
  perPage: BreakpointCustomizable<number>,
  perMove: BreakpointCustomizable<number>
): SplideBreakpoints => {
  return mergeDeep(toSplideBreakpoints('perPage', perPage), toSplideBreakpoints('perMove', perMove));
};

export const toSplideBreakpoints = (
  propName: ResponsiveOptsKey,
  value: BreakpointCustomizable<number>
): SplideBreakpoints => {
  return typeof value === 'object'
    ? Object.entries(value).reduce(
        (result, [key, val]: [BreakpointKey, number]) => ({
          ...result,
          // cut off 'px' suffix
          [key === 'base' ? 0 : breakpoint[key].slice(0, -2)]: {
            [propName]: val,
          },
        }),
        {}
      )
    : {
        0: {
          [propName]: value,
        },
      };
};

export const getAmountOfPages = (amountOfSlides: number, slidesPerPage: number): number => {
  // TODO: respect slidesPerMove
  // const naturalAmount = Math.floor(amountOfSlides / slidesPerPage);
  return amountOfSlides < slidesPerPage ? 1 : amountOfSlides - slidesPerPage + 1;
};

export const isFirstPage = (splide: Splide): boolean => splide.index === 0;
export const isLastPage = (splide: Splide, amountOfPages: number): boolean => splide.index === amountOfPages - 1;

export const slidePrev = (splide: Splide, amountOfPages: number): void => {
  splide.go(isFirstPage(splide) ? amountOfPages - 1 : '<');
};

export const slideNext = (splide: Splide, amountOfPages: number): void => {
  splide.go(isLastPage(splide, amountOfPages) ? 0 : '>');
};

export const updatePrevNextButtonAria = (btnPrev: ButtonPure, btnNext: ButtonPure, splide: Splide): void => {
  const { i18n } = splide.options;
  btnPrev.aria = { 'aria-label': i18n[isFirstPage(splide) ? 'last' : 'prev'] };
  btnNext.aria = {
    'aria-label':
      i18n[isLastPage(splide, getAmountOfPages(splide.splides.length, splide.options.perPage)) ? 'first' : 'next'],
  };
};

export const renderPagination = (paginationEl: HTMLElement, amountOfPages: number): void => {
  paginationEl.innerHTML = Array.from(Array(amountOfPages))
    .map(() => '<span class="bullet"></span>')
    .join('');
};

export const updatePagination = (paginationEl: HTMLElement, newIndex: number, prevIndex?: number): void => {
  const { children } = paginationEl;
  children[newIndex].classList.add(bulletActiveClass);

  if (prevIndex >= 0) {
    children[prevIndex].classList.remove(bulletActiveClass);
  }
};
