import { breakpoint } from './breakpoint';
import type { Breakpoint } from './breakpointShared';
import type { BKey } from './mediaQueryShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use 'sm' instead. */
export function getMediaQueryMax(max: BKey<'s'>): '@media(max-width:759px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'md' instead. */
export function getMediaQueryMax(max: BKey<'m'>): '@media(max-width:999px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'lg' instead. */
export function getMediaQueryMax(max: BKey<'l'>): '@media(max-width:1299px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use '2xl' instead. */
export function getMediaQueryMax(max: BKey<'xxl'>): '@media(max-width:1919px)';

export function getMediaQueryMax(max: BKey<'xs'>): '@media(max-width:479px)';
export function getMediaQueryMax(max: BKey<'sm'>): '@media(max-width:759px)';
export function getMediaQueryMax(max: BKey<'md'>): '@media(max-width:999px)';
export function getMediaQueryMax(max: BKey<'lg'>): '@media(max-width:1299px)';
export function getMediaQueryMax(max: BKey<'xl'>): '@media(max-width:1759px)';
export function getMediaQueryMax(max: BKey<'2xl'>): '@media(max-width:1919px)';
export function getMediaQueryMax(max: Exclude<Breakpoint, 'base'>): string {
  return `@media(max-width:${breakpoint[max] - 1}px)`;
}
