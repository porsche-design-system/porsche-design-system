import type { Breakpoint } from './breakpoint';
import { breakpoint } from './breakpoint';

type BKey<K extends Breakpoint> = Extract<Breakpoint, K>;

export function mediaQueryMin(min: BKey<'xxs'>): '@media(min-width:0px)';
export function mediaQueryMin(min: BKey<'xs'>): '@media(min-width:480px)';
export function mediaQueryMin(min: BKey<'s'>): '@media(min-width:760px)';
export function mediaQueryMin(min: BKey<'m'>): '@media(min-width:1000px)';
export function mediaQueryMin(min: BKey<'l'>): '@media(min-width:1300px)';
export function mediaQueryMin(min: BKey<'xl'>): '@media(min-width:1760px)';
export function mediaQueryMin(min: BKey<'xxl'>): '@media(min-width:1920px)';
export function mediaQueryMin(min: Breakpoint): string {
  return `@media(min-width:${breakpoint[min]}px)`;
}

export function mediaQueryMax(max: BKey<'xs'>): '@media(max-width:479px)';
export function mediaQueryMax(max: BKey<'s'>): '@media(max-width:759px)';
export function mediaQueryMax(max: BKey<'m'>): '@media(max-width:999px)';
export function mediaQueryMax(max: BKey<'l'>): '@media(max-width:1299px)';
export function mediaQueryMax(max: BKey<'xl'>): '@media(max-width:1759px)';
export function mediaQueryMax(max: BKey<'xxl'>): '@media(max-width:1919px)';
export function mediaQueryMax(max: Exclude<Breakpoint, 'xxs'>): string {
  return `@media(max-width:${breakpoint[max] - 1}px)`;
}

export function mediaQueryMinMax(min: BKey<'xxs'>, max: BKey<'xs'>): '@media(min-width:0px) and (max-width:479px)';
export function mediaQueryMinMax(min: BKey<'xxs'>, max: BKey<'s'>): '@media(min-width:0px) and (max-width:759px)';
export function mediaQueryMinMax(min: BKey<'xxs'>, max: BKey<'m'>): '@media(min-width:0px) and (max-width:999px)';
export function mediaQueryMinMax(min: BKey<'xxs'>, max: BKey<'l'>): '@media(min-width:0px) and (max-width:1299px)';
export function mediaQueryMinMax(min: BKey<'xxs'>, max: BKey<'xl'>): '@media(min-width:0px) and (max-width:1759px)';
export function mediaQueryMinMax(min: BKey<'xxs'>, max: BKey<'xxl'>): '@media(min-width:0px) and (max-width:1919px)';
export function mediaQueryMinMax(min: BKey<'xs'>, max: BKey<'s'>): '@media(min-width:480px) and (max-width:759px)';
export function mediaQueryMinMax(min: BKey<'xs'>, max: BKey<'m'>): '@media(min-width:480px) and (max-width:999px)';
export function mediaQueryMinMax(min: BKey<'xs'>, max: BKey<'l'>): '@media(min-width:480px) and (max-width:1299px)';
export function mediaQueryMinMax(min: BKey<'xs'>, max: BKey<'xl'>): '@media(min-width:480px) and (max-width:1759px)';
export function mediaQueryMinMax(min: BKey<'xs'>, max: BKey<'xxl'>): '@media(min-width:480px) and (max-width:1919px)';
export function mediaQueryMinMax(min: BKey<'s'>, max: BKey<'m'>): '@media(min-width:760px) and (max-width:999px)';
export function mediaQueryMinMax(min: BKey<'s'>, max: BKey<'l'>): '@media(min-width:760px) and (max-width:1299px)';
export function mediaQueryMinMax(min: BKey<'s'>, max: BKey<'xl'>): '@media(min-width:760px) and (max-width:1759px)';
export function mediaQueryMinMax(min: BKey<'s'>, max: BKey<'xxl'>): '@media(min-width:760px) and (max-width:1919px)';
export function mediaQueryMinMax(min: BKey<'m'>, max: BKey<'l'>): '@media(min-width:1000px) and (max-width:1299px)';
export function mediaQueryMinMax(min: BKey<'m'>, max: BKey<'xl'>): '@media(min-width:1000px) and (max-width:1759px)';
export function mediaQueryMinMax(min: BKey<'m'>, max: BKey<'xxl'>): '@media(min-width:1000px) and (max-width:1919px)';
export function mediaQueryMinMax(min: BKey<'l'>, max: BKey<'xl'>): '@media(min-width:1300px) and (max-width:1759px)';
export function mediaQueryMinMax(min: BKey<'l'>, max: BKey<'xxl'>): '@media(min-width:1300px) and (max-width:1919px)';
export function mediaQueryMinMax(min: BKey<'xl'>, max: BKey<'xxl'>): '@media(min-width:1760px) and (max-width:1919px)';
export function mediaQueryMinMax(min: any, max: Exclude<Breakpoint, 'xxs'>): string {
  return `${mediaQueryMin(min)} and (max-width:${breakpoint[max] - 1}px)`;
}
