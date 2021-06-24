import type { AriaAttributes } from 'react';
import { attachCss, buildGlobalStyles, getCss, getTagName } from '../../../utils';
import { slottedStyles, styles } from './table-styles';

export type Direction = 'asc' | 'desc';

export const TABLE_COMPONENTS = [
  'table',
  'table-head',
  'table-head-row',
  'table-head-cell',
  'table-body',
  'table-row',
  'table-cell',
] as const;
export type TableComponentType = typeof TABLE_COMPONENTS[number];

export type TableHeadCellSort = {
  id: string; // the only way for the consumer to identify which table column has been clicked on event callback
  active: boolean;
  direction: Direction;
};

export const isDirectionAsc = (dir: Direction): boolean => dir === 'asc';

export const toggleDirection = (dir: Direction): Direction => (isDirectionAsc(dir) ? 'desc' : 'asc');

export const getAriaSort = (sort: TableHeadCellSort): AriaAttributes['aria-sort'] => {
  return sort?.active ? (isDirectionAsc(sort.direction) ? 'ascending' : 'descending') : 'none';
};

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
