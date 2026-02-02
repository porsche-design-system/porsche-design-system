import { breakpoint } from './breakpoint';
import type { Breakpoint } from './breakpointShared';
import type { BKey } from './mediaQueryShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use getMediaQueryMin('xs') instead. */
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'xs'>): '(min-width:0px) and (max-width:479px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use getMediaQueryMin('sm') instead. */
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'s'>): '(min-width:0px) and (max-width:759px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use getMediaQueryMin('md') instead. */
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'m'>): '(min-width:0px) and (max-width:999px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use getMediaQueryMin('lg') instead. */
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'l'>): '(min-width:0px) and (max-width:1299px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use getMediaQueryMin('xl') instead. */
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'xl'>): '(min-width:0px) and (max-width:1759px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use getMediaQueryMin('2xl') instead. */
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'xxl'>): '(min-width:0px) and (max-width:1919px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'xs' and 'sm' instead. */
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'s'>): '(min-width:480px) and (max-width:759px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'xs' and 'md' instead. */
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'m'>): '(min-width:480px) and (max-width:999px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'xs' and 'lg' instead. */
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'l'>): '(min-width:480px) and (max-width:1299px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'xs' and '2xl' instead. */
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'xxl'>): '(min-width:480px) and (max-width:1919px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'sm' and 'md' instead. */
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'m'>): '(min-width:760px) and (max-width:999px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'sm' and 'lg' instead. */
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'l'>): '(min-width:760px) and (max-width:1299px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'sm' and 'xl' instead. */
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'xl'>): '(min-width:760px) and (max-width:1759px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'sm' and '2xl' instead. */
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'xxl'>): '(min-width:760px) and (max-width:1919px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'md' and 'lg' instead. */
export function getMediaQueryMinMax(min: BKey<'m'>, max: BKey<'l'>): '(min-width:1000px) and (max-width:1299px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'md' and 'xl' instead. */
export function getMediaQueryMinMax(min: BKey<'m'>, max: BKey<'xl'>): '(min-width:1000px) and (max-width:1759px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'md' and '2xl' instead. */
export function getMediaQueryMinMax(min: BKey<'m'>, max: BKey<'xxl'>): '(min-width:1000px) and (max-width:1919px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'lg' and 'xl' instead. */
export function getMediaQueryMinMax(min: BKey<'l'>, max: BKey<'xl'>): '(min-width:1300px) and (max-width:1759px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'lg' and '2xl' instead. */
export function getMediaQueryMinMax(min: BKey<'l'>, max: BKey<'xxl'>): '(min-width:1300px) and (max-width:1919px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'xl' and '2xl' instead. */
export function getMediaQueryMinMax(min: BKey<'xl'>, max: BKey<'xxl'>): '(min-width:1760px) and (max-width:1919px)';

export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'sm'>): '(min-width:480px) and (max-width:759px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'md'>): '(min-width:480px) and (max-width:999px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'lg'>): '(min-width:480px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'xl'>): '(min-width:480px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'2xl'>): '(min-width:480px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'sm'>, max: BKey<'md'>): '(min-width:760px) and (max-width:999px)';
export function getMediaQueryMinMax(min: BKey<'sm'>, max: BKey<'lg'>): '(min-width:760px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'sm'>, max: BKey<'xl'>): '(min-width:760px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'sm'>, max: BKey<'2xl'>): '(min-width:760px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'md'>, max: BKey<'lg'>): '(min-width:1000px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'md'>, max: BKey<'xl'>): '(min-width:1000px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'md'>, max: BKey<'2xl'>): '(min-width:1000px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'lg'>, max: BKey<'xl'>): '(min-width:1300px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'lg'>, max: BKey<'2xl'>): '(min-width:1300px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'xl'>, max: BKey<'2xl'>): '(min-width:1760px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: Exclude<Breakpoint, 'xxl'>, max: Exclude<Breakpoint, 'base'>): string {
  return `(min-width:${breakpoint[min]}px) and (max-width:${breakpoint[max] - 1}px)`;
}
