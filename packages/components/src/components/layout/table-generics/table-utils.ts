import type { AriaAttributes } from 'react';
import { buildGlobalStyles, getCss, getTagName } from '../../../utils';

export type Direction = 'asc' | 'desc';

export type HeadItem = {
  key: string;
  name: string;
  isSortable: boolean;
  isSorting: boolean;
  direction: Direction;
};

export const isDirectionAsc = (dir: Direction): boolean => dir === 'asc';

export const toggleDirection = (dir: Direction): Direction => (isDirectionAsc(dir) ? 'desc' : 'asc');

export const getAriaSort = (isSortable: boolean, dir: Direction): AriaAttributes['aria-sort'] =>
  isSortable ? (isDirectionAsc(dir) ? 'ascending' : 'descending') : 'none';

export const throwIfNotArray = (param: unknown): void => {
  if (!Array.isArray(param)) {
    throw new Error(`Supplied property should be of type 'array' but was '${typeof param}' instead: ${param}`);
  }
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildGlobalStyles({
      [getTagName(host)]: {
        '& tr:nth-child(even)': {
          background: 'lightgray',
        },
        '& td': {
          padding: 5,
          verticalAlign: 'top',
          overflow: 'hidden',
        },
      },
    })
  );
};
