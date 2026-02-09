import { breakpoint } from './breakpoint';
import type { Breakpoint } from './breakpointShared';
import type { BKey } from './mediaQueryShared';

export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'xs'>): '(min-width:0px) and (max-width:479px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'s'>): '(min-width:0px) and (max-width:759px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'m'>): '(min-width:0px) and (max-width:999px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'l'>): '(min-width:0px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'xl'>): '(min-width:0px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'xxl'>): '(min-width:0px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'s'>): '(min-width:480px) and (max-width:759px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'m'>): '(min-width:480px) and (max-width:999px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'l'>): '(min-width:480px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'xl'>): '(min-width:480px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'xxl'>): '(min-width:480px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'m'>): '(min-width:760px) and (max-width:999px)';
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'l'>): '(min-width:760px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'xl'>): '(min-width:760px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'xxl'>): '(min-width:760px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'m'>, max: BKey<'l'>): '(min-width:1000px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'m'>, max: BKey<'xl'>): '(min-width:1000px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'m'>, max: BKey<'xxl'>): '(min-width:1000px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'l'>, max: BKey<'xl'>): '(min-width:1300px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'l'>, max: BKey<'xxl'>): '(min-width:1300px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'xl'>, max: BKey<'xxl'>): '(min-width:1760px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: Exclude<Breakpoint, 'xxl'>, max: Exclude<Breakpoint, 'base'>): string {
  return `(min-width:${breakpoint[min]}px) and (max-width:${breakpoint[max] - 1}px)`;
}
