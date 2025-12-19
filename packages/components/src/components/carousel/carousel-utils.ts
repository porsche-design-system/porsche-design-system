import { type Breakpoint, breakpoint } from '@porsche-design-system/styles';
import type { Options, Splide } from '@splidejs/splide';
import type { BreakpointCustomizable, HeadingSize } from '../../types';
import {
  bulletActiveClass,
  bulletClass,
  bulletInfiniteClass,
  paginationInfiniteStartCaseClass,
} from './carousel-styles';

export const CAROUSEL_WIDTHS = ['basic', 'extended'] as const;
export type CarouselWidth = (typeof CAROUSEL_WIDTHS)[number];

export const CAROUSEL_SLIDES_PER_PAGE = ['auto', ...Array.from(new Array(10), (_, i) => i + 1)];
export type CarouselSlidesPerPage = (typeof CAROUSEL_SLIDES_PER_PAGE)[number];

export const CAROUSEL_ALIGN_HEADERS = ['start', 'center'] as const;
export type CarouselAlignHeader = (typeof CAROUSEL_ALIGN_HEADERS)[number];

export type CarouselHeadingSize = Extract<HeadingSize, 'x-large' | 'xx-large'>;

export const CAROUSEL_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type CarouselAriaAttribute = (typeof CAROUSEL_ARIA_ATTRIBUTES)[number];

// The offset value used for calculating the number of infinite bullets
const INFINITE_BULLET_OFFSET = 2;
// The total number of infinite bullets including the center bullet
const INFINITE_BULLET_AMOUNT = INFINITE_BULLET_OFFSET * 2 + 1;
// Infinite bullets will be shown if the total number of bullets is greater than this value
const INFINITE_BULLET_THRESHOLD = 5;

// https://splidejs.com/guides/i18n/#default-texts
// extracted from Options from '@splidejs/splide' but defined locally to not have to rebundle types
export type CarouselInternationalization =
  // | Partial<Pick<Options['i18n'], 'prev' | 'next' | 'first' | 'last' | 'slideLabel' | 'slide'>> | string;
  Partial<Record<'prev' | 'next' | 'first' | 'last' | 'slideLabel' | 'slide', string>> | string; // string to support attribute, gets removed via InputParser

export type CarouselUpdateEventDetail = { activeIndex: number; previousIndex: number };

export type SplideBreakpoints = Options['breakpoints'];

export type CarouselLanguageDirection = Extract<Options['direction'], 'ltr' | 'rtl'>;

export const CAROUSEL_ALIGN_CONTROLS = ['start', 'center', 'auto'] as const;
export type CarouselAlignControls = (typeof CAROUSEL_ALIGN_CONTROLS)[number];

export const getSplideBreakpoints = (
  perPage: Exclude<BreakpointCustomizable<CarouselSlidesPerPage>, string> | 'auto'
): SplideBreakpoints => {
  return typeof perPage === 'object'
    ? Object.entries(perPage).reduce(
        (result, [key, val]: [Breakpoint, number | string]) => ({
          ...result,
          [breakpoint[key]]: {
            // round to sanitize floating numbers
            perPage: val === 'auto' ? 1 : Math.round(val as number),
            autoWidth: val === 'auto',
          },
        }),
        {}
      )
    : {
        0: {
          // round to sanitize floating numbers
          perPage: perPage === 'auto' ? 1 : Math.round(perPage as unknown as number),
          autoWidth: perPage === 'auto',
        },
      };
};

export const getSlidesAndAddAttributes = (host: HTMLElement): HTMLElement[] => {
  const slides = Array.from(host.children).filter(
    ({ slot }) => slot !== 'heading' && slot !== 'description' && slot !== 'controls'
  ) as HTMLElement[];
  slides.forEach((el, i) => {
    el.setAttribute('slot', `slide-${i}`);
  });

  return slides;
};

export const getAmountOfPages = (amountOfSlides: number, slidesPerPage: number): number => {
  return amountOfSlides === 0 ? 0 : amountOfSlides < slidesPerPage ? 1 : amountOfSlides - slidesPerPage + 1;
};

export const isFirstPage = (splide: Splide): boolean => splide.index === 0;
export const isLastPage = (splide: Splide, amountOfPages: number): boolean => splide.index >= amountOfPages - 1; // catch removal of slide

export const internalCarousel = {
  isFirstPage,
  isLastPage,
  getAmountOfPages,
};

export const slidePrev = (splide: Splide, amountOfPages: number, focusOnCenterSlide?: boolean): void => {
  if (focusOnCenterSlide) {
    splide.go('<');
  } else {
    // sanitize in case of removal of slide since splide.index seems to be from before splide.refresh()
    const prevSlide = splide.index === amountOfPages ? splide.index - 2 : '<';
    splide.go(internalCarousel.isFirstPage(splide) ? amountOfPages - 1 : prevSlide);
  }
};

export const slideNext = (splide: Splide, amountOfPages: number, focusOnCenterSlide?: boolean): void => {
  if (focusOnCenterSlide) {
    splide.go('>');
  } else {
    splide.go(internalCarousel.isLastPage(splide, amountOfPages) ? 0 : '>');
  }
};

export const updatePrevNextButtons = (
  btnPrev: HTMLPButtonPureElement,
  btnNext: HTMLPButtonPureElement,
  splide: Splide
): void => {
  const { i18n, rewind } = splide.options;
  const isFirst = internalCarousel.isFirstPage(splide);
  btnPrev.disabled = isFirst && !rewind;
  btnPrev.aria = { 'aria-label': i18n[isFirst ? 'last' : 'prev'] };

  const isLast = internalCarousel.isLastPage(
    splide,
    internalCarousel.getAmountOfPages(splide.length, splide.options.perPage)
  );
  btnNext.disabled = isLast && !rewind;
  btnNext.aria = {
    'aria-label': i18n[isLast ? 'first' : 'next'],
  };
};

export const isInfinitePagination = (amountOfPages: number): boolean => {
  return amountOfPages > INFINITE_BULLET_THRESHOLD;
};

export const renderPagination = (
  paginationEl: HTMLElement,
  amountOfPages: number,
  activeIndex: number,
  splide: Splide
): void => {
  if (paginationEl) {
    // sanitize in case of removal of slide since activeIndex is from before splide.refresh()
    const sanitizedActiveIndex = activeIndex > amountOfPages - 1 ? amountOfPages - 1 : activeIndex;
    paginationEl.innerHTML = Array.from(
      new Array(amountOfPages),
      (_, i) => `<span class="bullet${i === sanitizedActiveIndex ? ` ${bulletActiveClass}` : ''}"></span>`
    ).join('');

    paginationEl.addEventListener('click', (e) => {
      const target = e.composedPath()[0] as HTMLElement;
      if (target.classList.contains(bulletClass)) {
        splide.go(Array.from(paginationEl.children).indexOf(target));
      }
    });

    if (isInfinitePagination(amountOfPages)) {
      updateBulletState(paginationEl, amountOfPages, sanitizedActiveIndex);
    }
  }
};

export const updateBulletState = (paginationEl: HTMLElement, amountOfPages: number, newIndex: number): void => {
  const isStartCase = newIndex < INFINITE_BULLET_OFFSET;
  const isEndCase = newIndex > amountOfPages - 1 - INFINITE_BULLET_OFFSET;
  const infiniteBulletRightIndex = newIndex + INFINITE_BULLET_OFFSET;
  const infiniteBulletLeftIndex = newIndex - INFINITE_BULLET_OFFSET;
  const endCaseInfiniteBulletIndex = amountOfPages - INFINITE_BULLET_AMOUNT;
  const startCaseInfiniteBulletIndex = INFINITE_BULLET_AMOUNT - 1;

  const isInfiniteBulletLeft = (bulletIndex: number): boolean =>
    isEndCase ? bulletIndex === endCaseInfiniteBulletIndex : bulletIndex === infiniteBulletLeftIndex;

  const isInfiniteBulletRight = (bulletIndex: number): boolean =>
    isStartCase ? bulletIndex === startCaseInfiniteBulletIndex : bulletIndex === infiniteBulletRightIndex;

  const paginationGap = getComputedStyle(paginationEl).columnGap; // Touch devices use a larger gap

  const getTranslateX = (): string => {
    if (isStartCase) {
      return '0';
    }
    if (isEndCase) {
      return `calc(-${amountOfPages - INFINITE_BULLET_AMOUNT} * ${paginationGap})`;
    }
    return `calc(-${newIndex - INFINITE_BULLET_OFFSET} * ${paginationGap})`;
  };

  paginationEl.style.transform = `translateX(${getTranslateX()})`;

  // Only update bullets around newIndex
  for (let i = newIndex - INFINITE_BULLET_AMOUNT - 1; i < newIndex + INFINITE_BULLET_AMOUNT + 1; i++) {
    const index = (i + amountOfPages) % amountOfPages;
    paginationEl.children[index].classList.toggle(
      bulletInfiniteClass,
      isInfiniteBulletLeft(index) || isInfiniteBulletRight(index)
    );
  }
  // Add/Remove class to pagination in order to style the first bullets when the index is in isStartCase
  paginationEl.classList.toggle(paginationInfiniteStartCaseClass, isStartCase);
};

export const updatePagination = (paginationEl: HTMLElement, amountOfPages: number, newIndex: number): void => {
  if (paginationEl) {
    paginationEl.querySelector(`.${bulletActiveClass}`).classList.remove(bulletActiveClass);
    paginationEl.children[newIndex].classList.add(bulletActiveClass);
    if (isInfinitePagination(amountOfPages)) {
      updateBulletState(paginationEl, amountOfPages, newIndex);
    }
  }
};

export const getLangDirection = (el: HTMLElement): CarouselLanguageDirection => {
  return (el.closest('[dir]')?.getAttribute('dir') as CarouselLanguageDirection) || 'ltr';
};
