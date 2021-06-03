import type { AriaAttributes } from 'react';
import { color, font } from '@porsche-design-system/utilities';
import { attachCss, buildGlobalStyles, buildHostStyles, getCss, getTagName, pxToRem } from '../../../utils';

export type Direction = 'asc' | 'desc';

export type TableHeadItem = Partial<{
  key: string;
  // name: string;
  isSortable: boolean;
  isSorting: boolean;
  direction: Direction;
}>;

export const isDirectionAsc = (dir: Direction): boolean => dir === 'asc';

export const toggleDirection = (dir: Direction): Direction => (isDirectionAsc(dir) ? 'desc' : 'asc');

export const getAriaSort = ({ isSortable, isSorting, direction }: TableHeadItem = {}): AriaAttributes['aria-sort'] =>
  isSortable && isSorting ? (isDirectionAsc(direction) ? 'ascending' : 'descending') : 'none';

export const SORT_EVENT_NAME = 'internalSortingChange';

export const getSlottedCss = (host: HTMLElement): string =>
  getCss(
    buildGlobalStyles({
      [getTagName(host)]: {
        '& img': {
          verticalAlign: 'top !important',
        },
        '& mark': {
          background: 'red !important',
          fontWeight: '700 !important',
        },
      },
    })
  );

export const TABLE_COMPONENTS = [
  'table',
  'table-head',
  'table-head-cell',
  'table-body',
  'table-row',
  'table-cell',
] as const;
export type TableComponentType = typeof TABLE_COMPONENTS[number];

const defaultColumnWidth = 120;

const baseCss: { [key in TableComponentType]: string } = {
  table: getCss(
    buildHostStyles({
      display: 'flex !important',
      flexFlow: 'column wrap !important',
      width: '100% !important',
      fontFamily: `${font.family} !important`,
      ...font.size.small, // TODO: !important is missing
      textAlign: 'left !important',
      whiteSpace: 'nowrap !important',
      overflow: 'auto', // can be overridden
    })
  ),
  'table-head': getCss({
    ...buildHostStyles({
      display: 'flex !important',
      flexDirection: 'column !important',
      fontWeight: `${font.weight.bold} !important`,
      borderBottom: `2px solid ${color.neutralContrast.high} !important`,
      overflow: 'hidden !important',
    }),
    '::slotted(*)': {
      border: '0 !important', // p-table-row
    },
  }),
  'table-head-cell': getCss({
    ...buildHostStyles({
      display: 'flex !important',
      alignItems: 'center', // can be overridden
      padding: `0 ${pxToRem(12)}rem ${pxToRem(8)}rem 0 !important`,
      width: defaultColumnWidth, // can be overridden
    }),
    ':host(:last-child)': {
      paddingRight: '0 !important',
    },
    ...buildGlobalStyles({
      button: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        boxSizing: 'border-box',
        appearance: 'none',
        border: 'none',
        fontFamily: font.family,
        ...font.size.small,
        fontWeight: font.weight.bold,
        textDecoration: 'none',
        textAlign: 'left',
        background: 'transparent',
        cursor: 'pointer',
        color: color.default,
        overflow: 'hidden',
        transition: 'color $p-animation-hover-duration $p-animation-hover-bezier', // TODO: actual values
        // TODO: Utilities package with string focus styles was not useful, implement new focus helper in utils that returns style object
        outline: 'transparent solid 1px',
        outlineOffset: 0,
        '::-moz-focus-inner': { border: 0 },
        '&:focus': { outlineColor: '#000' },
        '&:focus:not(:focus-visible)': { outlineColor: 'transparent' },
        '&:hover': {
          color: color.state.hover,
        },
        '&:hover,&:focus': {
          '& .icon': {
            opacity: 1,
          },
        },
      },
      span: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    }),
    icon: {
      opacity: 0,
      marginLeft: 3,
      '&--active': {
        opacity: 1,
      },
    },
  }),
  'table-body': getCss({
    ...buildHostStyles({
      display: 'flex !important',
      flexDirection: 'column !important',
      overflow: 'hidden !important',
    }),
  }),
  'table-row': getCss({
    ...buildHostStyles({
      display: 'flex !important',
      flexDirection: 'row !important',
      alignItems: 'center !important',
      flexWrap: 'nowrap !important',
      width: '100% !important',
      position: 'relative',
      // no !important style, so it can be overridden via ::slotted selector in table-head
      borderBottom: `1px solid ${color.neutralContrast.medium}`,
    }),
  }),
  'table-cell': getCss({
    ...buildHostStyles({
      padding: `${pxToRem(12)}rem ${pxToRem(12)}rem ${pxToRem(12)}rem 0 !important`,
      margin: '0 !important',
      width: defaultColumnWidth, // can be overridden
      textOverflow: 'ellipsis', // can be overridden
      overflow: 'hidden', // can be overridden
    }),
    ':host(:last-child)': {
      paddingRight: '0 !important',
    },
  }),
};

export const getTableCss = (host: HTMLElement): string => {
  const [, tableComponent] = /^(?:.*)-?p-(.*)$/.exec(getTagName(host)) || [];
  return baseCss[tableComponent];
};

export const addCss = (host: HTMLElement): void => {
  attachCss(host, getTableCss(host));
};
