import { breakpoint } from '../../js';
import type { Breakpoint } from '../../js';
import type { BKey } from '../../js/mediaQuery/mediaQueryShared';

export function getMediaQueryMin(min: BKey<'base'>): '(min-width:0px)';
export function getMediaQueryMin(min: BKey<'xs'>): '(min-width:480px)';
export function getMediaQueryMin(min: BKey<'s'>): '(min-width:760px)';
export function getMediaQueryMin(min: BKey<'m'>): '(min-width:1000px)';
export function getMediaQueryMin(min: BKey<'l'>): '(min-width:1300px)';
export function getMediaQueryMin(min: BKey<'xl'>): '(min-width:1760px)';
export function getMediaQueryMin(min: BKey<'xxl'>): '(min-width:1920px)';
export function getMediaQueryMin(min: Breakpoint): string {
  return `(min-width:${breakpoint[min]}px)`;
}
