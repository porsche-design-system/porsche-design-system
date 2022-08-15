import type { Options } from '@splidejs/splide';
import type { ResponsiveOptions } from '@splidejs/splide';
import type { BreakpointCustomizable, BreakpointKey } from '../../../types';
import { mergeDeep, parseJSON } from '../../../utils';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import type { Splide } from '@splidejs/splide';
import { ButtonPure } from '../../action/button-pure/button-pure';
import { bulletActiveClass } from './carousel-styles';

export type CarouselI18n = Partial<Pick<Options['i18n'], 'slideLabel' | 'prev' | 'next' | 'first' | 'last'>>;
export type CarouselChangeEvent = { activeIndex: number; previousIndex: number };

type ResponsiveOpts = Pick<ResponsiveOptions, 'gap' | 'perPage' | 'perMove'>;
type ResponsiveOptsKey = keyof ResponsiveOpts;
export type SplideBreakpoints = Options['breakpoints'];

// TODO: gap?
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

export const getAmountOfSlides = (splide: Splide): number => splide.Components.Slides.getLength();

export const isFirstSlide = (splide: Splide): boolean => splide.index === 0;
export const isLastSlide = (splide: Splide): boolean => splide.index === getAmountOfSlides(splide) - 1;

export const slidePrev = (splide: Splide): void => {
  splide.go(isFirstSlide(splide) ? getAmountOfSlides(splide) - 1 : '<');
};

export const slideNext = (splide: Splide): void => {
  splide.go(isLastSlide(splide) ? 0 : '>');
};

export const updatePrevNextButtonAria = (btnPrev: ButtonPure, btnNext: ButtonPure, splide: Splide): void => {
  const { i18n } = splide.options;
  btnPrev.aria = { 'aria-label': i18n[isFirstSlide(splide) ? 'last' : 'prev'] };
  btnNext.aria = { 'aria-label': i18n[isLastSlide(splide) ? 'first' : 'next'] };
};

export const updatePagination = (paginationEl: HTMLElement, newIndex: number, prevIndex?: number): void => {
  // TODO: calculation of amount of bullets
  if (paginationEl) {
    const { children } = paginationEl;
    children[newIndex].classList.add(bulletActiveClass);

    if (prevIndex >= 0) {
      children[prevIndex].classList.remove(bulletActiveClass);
    }
  }
};
