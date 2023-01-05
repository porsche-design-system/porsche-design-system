import type { BKey } from './mediaQueryShared';
import type { Breakpoint } from './breakpoint';
import { breakpoint } from './breakpoint';

export function mediaQueryMin(min: BKey<'base'>): '@media(min-width:0px)';
export function mediaQueryMin(min: BKey<'xs'>): '@media(min-width:480px)';
export function mediaQueryMin(min: BKey<'s'>): '@media(min-width:760px)';
export function mediaQueryMin(min: BKey<'m'>): '@media(min-width:1000px)';
export function mediaQueryMin(min: BKey<'l'>): '@media(min-width:1300px)';
export function mediaQueryMin(min: BKey<'xl'>): '@media(min-width:1760px)';
export function mediaQueryMin(min: BKey<'xxl'>): '@media(min-width:1920px)';
export function mediaQueryMin(min: Breakpoint): string {
  return `@media(min-width:${breakpoint[min]})`;
}
