import type { Options } from '@splidejs/splide';
import type { ResponsiveOptions } from '@splidejs/splide';
import type { BreakpointCustomizable, BreakpointKey } from '../../../types';
import { mergeDeep, parseJSON } from '../../../utils';
import { breakpoint } from '@porsche-design-system/utilities-v2';

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
  value = parseJSON(value) as any; // TODO: parse only once initially?

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
