import type { AriaAttributes } from 'react';
import { buildGlobalStyles, getCss, getTagName, pxToRem } from '../../../utils';

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

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildGlobalStyles({
      [getTagName(host)]: {
        '& td': {
          display: 'table-cell !important',
          padding: `${pxToRem(12)}rem ${pxToRem(12)}rem ${pxToRem(12)}rem 0 !important`,
          verticalAlign: 'top !important',
          '&:last-child': {
            paddingRight: '0 !important',
          },
        },
        '& td > *': {
          verticalAlign: 'top !important',
        },
        '& mark': {
          background: 'red !important',
          fontWeight: '700 !important',
        },
      },
    })
  );
};
