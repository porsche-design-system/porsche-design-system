import { breakpoint } from './breakpoint';
import type { Breakpoint } from './breakpointShared';
import type { BKey } from './mediaQueryShared';

export function getMediaQueryMin(min: BKey<'base'>): '@media(min-width:0px)';
export function getMediaQueryMin(min: BKey<'xs'>): '@media(min-width:480px)';
export function getMediaQueryMin(min: BKey<'s'>): '@media(min-width:760px)';
export function getMediaQueryMin(min: BKey<'m'>): '@media(min-width:1000px)';
export function getMediaQueryMin(min: BKey<'l'>): '@media(min-width:1300px)';
export function getMediaQueryMin(min: BKey<'xl'>): '@media(min-width:1760px)';
export function getMediaQueryMin(min: BKey<'xxl'>): '@media(min-width:1920px)';
export function getMediaQueryMin(min: Breakpoint): string {
  return `@media(min-width:${breakpoint[min]}px)`;
}
