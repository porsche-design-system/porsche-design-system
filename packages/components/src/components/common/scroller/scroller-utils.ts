import { getScrollByX } from '../../../utils';
import type { JssStyle } from 'jss';

export type ActiveElementChange = { activeElementIndex: number };
export type Direction = 'prev' | 'next';
export type GradientColorTheme = 'default' | 'surface';
export type ScrollToPosition = { scrollPosition: number; isSmooth?: boolean };
export type PrevNextButtonJssStyle = JssStyle;

export const getScrollPositionAfterPrevNextClick = (scrollAreaElement: HTMLElement, direction: string): number => {
  const { scrollLeft } = scrollAreaElement;
  const scrollByX = getScrollByX(scrollAreaElement);
  let scrollPosition: number;
  if (direction === 'next') {
    scrollPosition = scrollLeft + scrollByX;
  } else {
    scrollPosition = scrollLeft - scrollByX;
  }
  return scrollPosition;
};
