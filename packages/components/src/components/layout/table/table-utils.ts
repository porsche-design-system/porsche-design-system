import type { AriaAttributes } from 'react';
import { attachCss, buildGlobalStyles, getCss, getTagName } from '../../../utils';
import { slottedStyles, styles } from './table-styles';

export type Direction = 'asc' | 'desc';

export type TableHeadItem = Partial<{
  key: string;
  isSortable: boolean;
  isSorting: boolean;
  direction: Direction;
}>;

export const isDirectionAsc = (dir: Direction): boolean => dir === 'asc';

export const toggleDirection = (dir: Direction): Direction => (isDirectionAsc(dir) ? 'desc' : 'asc');

export const getAriaSort = ({ isSortable, isSorting, direction }: TableHeadItem = {}): AriaAttributes['aria-sort'] =>
  isSortable && isSorting ? (isDirectionAsc(direction) ? 'ascending' : 'descending') : 'none';

export const SORT_EVENT_NAME = 'internalSortingChange';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildGlobalStyles({
      [getTagName(host)]: slottedStyles,
    })
  );
};

export const getTableCss = (host: HTMLElement): string => {
  const [, tableComponent] = /^(?:.*)-?p-(.*)$/.exec(getTagName(host)) || [];
  return styles[tableComponent];
};

export const addCss = (host: HTMLElement): void => {
  attachCss(host, getTableCss(host));
};

export const getScrollByX = (scrollAreaElement: HTMLElement): number => {
  const { offsetWidth } = scrollAreaElement;
  return Math.round(offsetWidth * 0.2);
};
