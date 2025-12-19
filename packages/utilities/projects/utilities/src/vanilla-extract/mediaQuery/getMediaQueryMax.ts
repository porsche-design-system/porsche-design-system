import { breakpoint } from './breakpoint';
import type { Breakpoint } from './breakpointShared';
import type { BKey } from './mediaQueryShared';

export function getMediaQueryMax(max: BKey<'xs'>): '(max-width:479px)';
export function getMediaQueryMax(max: BKey<'s'>): '(max-width:759px)';
export function getMediaQueryMax(max: BKey<'m'>): '(max-width:999px)';
export function getMediaQueryMax(max: BKey<'l'>): '(max-width:1299px)';
export function getMediaQueryMax(max: BKey<'xl'>): '(max-width:1759px)';
export function getMediaQueryMax(max: BKey<'xxl'>): '(max-width:1919px)';
export function getMediaQueryMax(max: Exclude<Breakpoint, 'base'>): string {
  return `(max-width:${breakpoint[max] - 1}px)`;
}
