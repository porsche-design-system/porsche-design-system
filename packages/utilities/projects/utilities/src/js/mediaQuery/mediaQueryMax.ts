import type { BKey } from './mediaQueryShared';
import type { Breakpoint } from './breakpoint';
import { breakpoint } from './breakpoint';

export function mediaQueryMax(max: BKey<'xs'>): '@media(max-width:479px)';
export function mediaQueryMax(max: BKey<'s'>): '@media(max-width:759px)';
export function mediaQueryMax(max: BKey<'m'>): '@media(max-width:999px)';
export function mediaQueryMax(max: BKey<'l'>): '@media(max-width:1299px)';
export function mediaQueryMax(max: BKey<'xl'>): '@media(max-width:1759px)';
export function mediaQueryMax(max: BKey<'xxl'>): '@media(max-width:1919px)';
export function mediaQueryMax(max: Exclude<Breakpoint, 'base'>): string {
  return `@media(max-width:${(breakpoint[max].slice(0, -2) as unknown as number) - 1}px)`;
}
