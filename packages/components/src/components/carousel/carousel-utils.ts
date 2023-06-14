import type { Options, Splide } from '@splidejs/splide';
import type { Breakpoint } from '@porsche-design-system/utilities-v2';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';
import type { TagName } from '@porsche-design-system/shared';
import { getTagName, hasNamedSlot } from '../../utils';
import { ButtonPure } from '../button-pure/button-pure';
import { bulletActiveClass, bulletInfiniteClass, paginationInfiniteClass } from './carousel-styles';

export const CAROUSEL_WIDTHS = ['basic', 'extended'] as const;
export type CarouselWidth = (typeof CAROUSEL_WIDTHS)[number];

export const CAROUSEL_ALIGN_HEADERS = ['left', 'center'] as const;
export type CarouselAlignHeader = (typeof CAROUSEL_ALIGN_HEADERS)[number];

const INFINITE_BULLET_OFFSET = 2;
const INFINITE_BULLET_AMOUNT = INFINITE_BULLET_OFFSET * 2 + 1;
const INFINITE_BULLET_THRESHOLD = 5;

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
    console.warn(
      `A heading has to be set via property or named slot on ${getTagName(host)} in order to ensure accessibility.`
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

export const isInfinitePagination = (amountOfPages: number): boolean => {
  return amountOfPages > INFINITE_BULLET_THRESHOLD;
};

export const renderPagination = (paginationEl: HTMLElement, amountOfPages: number, activeIndex: number): void => {
  if (paginationEl) {
    // sanitize in case of removal of slide since activeIndex is from before splide.refresh()
    activeIndex = activeIndex > amountOfPages - 1 ? amountOfPages - 1 : activeIndex;
    paginationEl.innerHTML = Array.from(Array(amountOfPages))
      .map((_, i) => `<span class='bullet${i === activeIndex ? ' ' + bulletActiveClass : ''}'></span>`)
      .join('');
    if (isInfinitePagination(amountOfPages)) {
      updateBulletState(paginationEl, amountOfPages, activeIndex);
    }
  }
};

export const updateBulletState = (paginationEl: HTMLElement, amountOfPages: number, newIndex: number): void => {
  const edgeCaseIndex = INFINITE_BULLET_OFFSET + 1;
  const isStartCase = newIndex < edgeCaseIndex - 1;
  const isEndCase = newIndex > amountOfPages - 1 - edgeCaseIndex;
  const infiniteBulletRight = newIndex + INFINITE_BULLET_OFFSET;
  const infiniteBulletLeft = newIndex - INFINITE_BULLET_OFFSET;

  const isInfiniteBulletStart = (bulletIndex: number): boolean =>
    isEndCase ? bulletIndex === amountOfPages - INFINITE_BULLET_AMOUNT : bulletIndex === infiniteBulletLeft;

  const isInfiniteBulletEnd = (bulletIndex: number): boolean =>
    isStartCase ? bulletIndex === INFINITE_BULLET_AMOUNT - 1 : bulletIndex === infiniteBulletRight;

  // Update pagination translate position
  const transformValue = (isEndCase ? amountOfPages - INFINITE_BULLET_AMOUNT : Math.max(newIndex - 2, 0)) * 8;
  paginationEl.style.transform = `translateX(-${transformValue}px)`;

  // Only update bullets around newIndex
  for (let i = newIndex - INFINITE_BULLET_AMOUNT - 1; i < newIndex + INFINITE_BULLET_AMOUNT + 1; i++) {
    const index = (i + amountOfPages) % amountOfPages;
    paginationEl.children[index]?.classList[
      isInfiniteBulletStart(index) || isInfiniteBulletEnd(index) ? 'add' : 'remove'
    ](bulletInfiniteClass);
  }
  paginationEl.classList[isStartCase ? 'add' : 'remove'](paginationInfiniteClass);
};

export const updatePagination = (paginationEl: HTMLElement, amountOfPages: number, newIndex: number): void => {
  if (paginationEl) {
    paginationEl.querySelector('.' + bulletActiveClass).classList.remove(bulletActiveClass);
    paginationEl.children[newIndex].classList.add(bulletActiveClass);
    if (isInfinitePagination(amountOfPages)) {
      updateBulletState(paginationEl, amountOfPages, newIndex);
    }
  }
};

export let hasInertSupport = typeof HTMLElement !== 'undefined' && HTMLElement.prototype.hasOwnProperty('inert');

// for unit tests
export const overrideHasInertSupport = (override: boolean): void => {
  hasInertSupport = override;
};

export const updateSlidesInert = (splide: Splide): void => {
  // splide doesn't exist yet on first run but on later reconnects or update calls
  if (splide) {
    const slides = splide.Components.Slides.get().map((slide) => slide.slide);
    const {
      index,
      options: { perPage },
    } = splide;
    const maxIndex = index + perPage;

    if (hasInertSupport) {
      // add inert attribute on slides in shadowDOM
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert
      // https://caniuse.com/?search=inert
      slides.forEach((slide, i) =>
        i >= index && i < maxIndex ? slide.removeAttribute('inert') : slide.setAttribute('inert', '')
      );
    } else {
      // fallback with tabindex handling for certain elements in lightDOM
      const prefix = getTagName((splide.root.getRootNode() as ShadowRoot).host as HTMLElement).replace('carousel', '');
      const tagNames: TagName[] = ['p-button', 'p-button-pure', 'p-link', 'p-link-pure'];
      const pdsSelectors = tagNames.map((tagName) => tagName.replace(/^p-/, prefix)).join();

      slides.forEach((slide, i) =>
        ((slide.firstChild as HTMLSlotElement).assignedNodes()[0] as HTMLElement)
          .querySelectorAll(`[href],button,${pdsSelectors}`)
          .forEach((el) =>
            i >= index && i < maxIndex ? el.removeAttribute('tabindex') : el.setAttribute('tabindex', '-1')
          )
      );
    }
  }
};
