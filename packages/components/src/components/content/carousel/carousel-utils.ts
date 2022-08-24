import type { Options } from '@splidejs/splide';
import type { ResponsiveOptions } from '@splidejs/splide';
import type { BreakpointCustomizable, BreakpointKey } from '../../../types';
import { getTagName, hasNamedSlot, mergeDeep } from '../../../utils';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import type { Splide } from '@splidejs/splide';
import { ButtonPure } from '../../action/button-pure/button-pure';
import { bulletActiveClass } from './carousel-styles';
import type { TagName } from '@porsche-design-system/shared';

// https://splidejs.com/guides/i18n/#default-texts
export type CarouselInternationalization =
  | Partial<Pick<Options['i18n'], 'prev' | 'next' | 'first' | 'last' | 'slideLabel' | 'slide'>>
  | string; // string to support attribute, gets removed via InputParser
export type CarouselChangeEvent = { activeIndex: number; previousIndex: number };

type ResponsiveOpts = Pick<ResponsiveOptions, 'perPage' | 'gap'>;
type ResponsiveOptsKey = keyof ResponsiveOpts;
export type SplideBreakpoints = Options['breakpoints'];

export const getSplideBreakpoints = (
  perPage: Exclude<BreakpointCustomizable<number>, string>,
  gap: BreakpointCustomizable<string>
): SplideBreakpoints => {
  return mergeDeep(toSplideBreakpoints('perPage', perPage), toSplideBreakpoints('gap', gap));
};

export const toSplideBreakpoints = <T>(
  propName: ResponsiveOptsKey,
  value: BreakpointCustomizable<T>
): SplideBreakpoints => {
  return typeof value === 'object'
    ? Object.entries(value).reduce(
        (result, [key, val]: [BreakpointKey, number]) => ({
          ...result,
          // cut off 'px' suffix
          [key === 'base' ? 0 : breakpoint[key].slice(0, -2)]: {
            [propName]: propName === 'perPage' ? Math.round(val) : val,
          },
        }),
        {}
      )
    : {
        0: {
          [propName]: propName === 'perPage' ? Math.round(value as unknown as number) : value,
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

export const getSlides = (host: HTMLElement): HTMLElement[] => {
  const slides = Array.from(host.children).filter(
    (el) => el.slot !== 'heading' && el.slot !== 'subheading'
  ) as HTMLElement[];
  slides.forEach((el, i) => el.setAttribute('slot', `slide-${i}`));

  return slides;
};

export const getAmountOfPages = (amountOfSlides: number, slidesPerPage: number): number => {
  // TODO: respect slidesPerMove
  // const naturalAmount = Math.floor(amountOfSlides / slidesPerPage);
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

export const updatePrevNextButtonAria = (btnPrev: ButtonPure, btnNext: ButtonPure, splide: Splide): void => {
  const { i18n } = splide.options;
  btnPrev.aria = { 'aria-label': i18n[isFirstPage(splide) ? 'last' : 'prev'] };
  btnNext.aria = {
    'aria-label': i18n[isLastPage(splide, getAmountOfPages(splide.length, splide.options.perPage)) ? 'first' : 'next'],
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

export let hasInertSupport = HTMLElement.prototype.hasOwnProperty('inert');

// for unit tests
// TODO: check tree shaking
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
      const pdsSelectors = tagNames.map((tagName) => tagName.replace(/^p-/, prefix)).join(',');

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
