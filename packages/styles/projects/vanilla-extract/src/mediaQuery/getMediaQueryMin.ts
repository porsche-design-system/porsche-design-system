import { breakpoint } from './breakpoint';
import type { Breakpoint } from './breakpointShared';
import type { BKey } from './mediaQueryShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use no media query instead. */
export function getMediaQueryMin(min: BKey<'base'>): '(min-width:0px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'sm' instead. */
export function getMediaQueryMin(min: BKey<'s'>): '(min-width:760px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'md' instead. */
export function getMediaQueryMin(min: BKey<'m'>): '(min-width:1000px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use 'lg' instead. */
export function getMediaQueryMin(min: BKey<'l'>): '(min-width:1300px)';
/** @deprecated since v4.0.0, will be removed with next major release. Use '2xl' instead. */
export function getMediaQueryMin(min: BKey<'xxl'>): '(min-width:1920px)';

export function getMediaQueryMin(min: BKey<'xs'>): '(min-width:480px)';
export function getMediaQueryMin(min: BKey<'sm'>): '(min-width:760px)';
export function getMediaQueryMin(min: BKey<'md'>): '(min-width:1000px)';
export function getMediaQueryMin(min: BKey<'lg'>): '(min-width:1300px)';
export function getMediaQueryMin(min: BKey<'xl'>): '(min-width:1760px)';
export function getMediaQueryMin(min: BKey<'2xl'>): '(min-width:1920px)';
export function getMediaQueryMin(min: Breakpoint): string {
  return `(min-width:${breakpoint[min]}px)`;
}
