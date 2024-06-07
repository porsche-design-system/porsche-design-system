import { CarouselAriaInternationalization } from '../components/carousel/carousel-utils';
import {
  PaginationAriaInternationalization,
  PaginationInternationalization,
} from '../components/pagination/pagination-utils';

type IntlFromAriaInput = PaginationAriaInternationalization | CarouselAriaInternationalization;
type IntlFromAriaOutput = PaginationInternationalization | CarouselAriaInternationalization;

export const getIntlFromAria = (aria?: IntlFromAriaInput): IntlFromAriaOutput => {
  if (!aria) {
    return {};
  }

  const intlObj: IntlFromAriaOutput = {};
  const translationKey = 'aria-label';

  for (const key of Object.keys(aria)) {
    // { 'aria-label': 'Lorem ipsum' }
    if (key === translationKey) {
      intlObj.root = aria[key];
    }

    // { key: { 'aria-label': 'Lorem ipsum' } }
    intlObj[key] = aria[key][translationKey];
  }

  return intlObj;
};
