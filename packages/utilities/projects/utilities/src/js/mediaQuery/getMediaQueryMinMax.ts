import type { BKey } from './mediaQueryShared';
import type { Breakpoint } from './breakpointShared';
import { breakpoint } from './breakpoint';

export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'xs'>): '@media(min-width:0px) and (max-width:479px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'s'>): '@media(min-width:0px) and (max-width:759px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'m'>): '@media(min-width:0px) and (max-width:999px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'l'>): '@media(min-width:0px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'base'>, max: BKey<'xl'>): '@media(min-width:0px) and (max-width:1759px)';
export function getMediaQueryMinMax(
  min: BKey<'base'>,
  max: BKey<'xxl'>
): '@media(min-width:0px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'s'>): '@media(min-width:480px) and (max-width:759px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'m'>): '@media(min-width:480px) and (max-width:999px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'l'>): '@media(min-width:480px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'xs'>, max: BKey<'xl'>): '@media(min-width:480px) and (max-width:1759px)';
export function getMediaQueryMinMax(
  min: BKey<'xs'>,
  max: BKey<'xxl'>
): '@media(min-width:480px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'m'>): '@media(min-width:760px) and (max-width:999px)';
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'l'>): '@media(min-width:760px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'xl'>): '@media(min-width:760px) and (max-width:1759px)';
export function getMediaQueryMinMax(min: BKey<'s'>, max: BKey<'xxl'>): '@media(min-width:760px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'m'>, max: BKey<'l'>): '@media(min-width:1000px) and (max-width:1299px)';
export function getMediaQueryMinMax(min: BKey<'m'>, max: BKey<'xl'>): '@media(min-width:1000px) and (max-width:1759px)';
export function getMediaQueryMinMax(
  min: BKey<'m'>,
  max: BKey<'xxl'>
): '@media(min-width:1000px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: BKey<'l'>, max: BKey<'xl'>): '@media(min-width:1300px) and (max-width:1759px)';
export function getMediaQueryMinMax(
  min: BKey<'l'>,
  max: BKey<'xxl'>
): '@media(min-width:1300px) and (max-width:1919px)';
export function getMediaQueryMinMax(
  min: BKey<'xl'>,
  max: BKey<'xxl'>
): '@media(min-width:1760px) and (max-width:1919px)';
export function getMediaQueryMinMax(min: Exclude<Breakpoint, 'xxl'>, max: Exclude<Breakpoint, 'base'>): string {
  return `@media(min-width:${breakpoint[min]}px) and (max-width:${breakpoint[max] - 1}px)`;
}
