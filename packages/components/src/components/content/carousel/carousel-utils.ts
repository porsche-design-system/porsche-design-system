import type { Options } from '@splidejs/splide';

export type CarouselI18n = Options['i18n']; // TODO: pick relevant ones
export type CarouselChangeEvent = { activeIndex: number; previousIndex: number };
