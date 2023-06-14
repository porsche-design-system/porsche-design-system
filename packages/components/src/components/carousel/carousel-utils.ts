import type { Options, Splide } from '@splidejs/splide';
import type { Breakpoint } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';
import { consoleWarn, getTagNameWithoutPrefix, hasNamedSlot } from '../../utils';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import { ButtonPure } from '../button-pure/button-pure';
import { bulletActiveClass } from './carousel-styles';

export const CAROUSEL_WIDTHS = ['basic', 'extended'] as const;
export type CarouselWidth = (typeof CAROUSEL_WIDTHS)[number];

export const CAROUSEL_ALIGN_HEADERS = ['left', 'center'] as const;
export type CarouselAlignHeader = (typeof CAROUSEL_ALIGN_HEADERS)[number];

// https://splidejs.com/guides/i18n/#default-texts
// extracted from Options from '@splidejs/splide' but defined locally to not have to rebundle types
export type CarouselInternationalization =
  // | Partial<Pick<Options['i18n'], 'prev' | 'next' | 'first' | 'last' | 'slideLabel' | 'slide'>> | string;
  Partial<Record<'prev' | 'next' | 'first' | 'last' | 'slideLabel' | 'slide', string>> | string; // string to support attribute, gets removed via InputParser
export type CarouselUpdateEvent = { activeIndex: number; previousIndex: number };

export type SplideBreakpoints = Options['breakpoints'];

export const getSplideBreakpoints = (
  perPage: Exclude<BreakpointCustomizable<number>, string> | 'auto'
): SplideBreakpoints => {
  return typeof perPage === 'object'
    ? Object.entries(perPage).reduce(
        (result, [key, val]: [Breakpoint, number]) => ({
          ...result,
          [breakpoint[key]]: {
            // round to sanitize floating numbers
            perPage: Math.round(val),
          },
        }),
        {}
      )
    : {
        0: {
          // round to sanitize floating numbers
          perPage: perPage === 'auto' ? 1 : Math.round(perPage as unknown as number),
        },
      };
};

export const warnIfHeadingIsMissing = (host: HTMLElement, heading: string): void => {
  if (!heading && !hasNamedSlot(host, 'heading')) {
    consoleWarn(
      `heading has to be set via property or named slot for component ${getTagNameWithoutPrefix(
        host
      )} in order to ensure accessibility.`
    );
  }
};

export const getSlidesAndAddNamedSlots = (host: HTMLElement): HTMLElement[] => {
  const slides = Array.from(host.children).filter(
    ({ slot }) => slot !== 'heading' && slot !== 'description'
  ) as HTMLElement[];
  slides.forEach((el, i) => el.setAttribute('slot', `slide-${i}`));

  return slides;
};

export const getAmountOfPages = (amountOfSlides: number, slidesPerPage: number): number => {
  return amountOfSlides === 0 ? 0 : amountOfSlides < slidesPerPage ? 1 : amountOfSlides - slidesPerPage + 1;
};

export const isFirstPage = (splide: Splide): boolean => splide.index === 0;
export const isLastPage = (splide: Splide, amountOfPages: number): boolean => splide.index >= amountOfPages - 1; // catch removal of slide

export const slidePrev = (splide: Splide, amountOfPages: number): void => {
  // sanitize in case of removal of slide since splide.index seems to be from before splide.refresh()
  const prevSlide = splide.index === amountOfPages ? splide.index - 2 : '<';
  splide.go(isFirstPage(splide) ? amountOfPages - 1 : prevSlide);
};

export const slideNext = (splide: Splide, amountOfPages: number): void => {
  splide.go(isLastPage(splide, amountOfPages) ? 0 : '>');
};

export const updatePrevNextButtons = (btnPrev: ButtonPure, btnNext: ButtonPure, splide: Splide): void => {
  const { i18n, rewind } = splide.options;
  const isFirst = isFirstPage(splide);
  btnPrev.disabled = isFirst && !rewind;
  btnPrev.aria = { 'aria-label': i18n[isFirst ? 'last' : 'prev'] };

  const isLast = isLastPage(splide, getAmountOfPages(splide.length, splide.options.perPage));
  btnNext.disabled = isLast && !rewind;
  btnNext.aria = {
    'aria-label': i18n[isLast ? 'first' : 'next'],
  };
};

export const renderPagination = (paginationEl: HTMLElement, amountOfPages: number, activeIndex: number): void => {
  if (paginationEl) {
    // sanitize in case of removal of slide since activeIndex is from before splide.refresh()
    activeIndex = activeIndex > amountOfPages - 1 ? amountOfPages - 1 : activeIndex;
    paginationEl.innerHTML = Array.from(Array(amountOfPages))
      .map((_, i) => `<span class='bullet${i === activeIndex ? ' ' + bulletActiveClass : ''}'></span>`)
      .join('');
  }
};

export const updatePagination = (paginationEl: HTMLElement, newIndex: number): void => {
  if (paginationEl) {
    paginationEl.querySelector('.' + bulletActiveClass).classList.remove(bulletActiveClass);
    paginationEl.children[newIndex].classList.add(bulletActiveClass);
  }
};
