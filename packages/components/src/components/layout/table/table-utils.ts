import type { AriaAttributes } from 'react';
import { color, font } from '@porsche-design-system/utilities';
import { attachCss, buildGlobalStyles, buildHostStyles, getCss, getTagName, pxToRem } from '../../../utils';

export type Direction = 'asc' | 'desc';

export type TableHeadItem = {
  key: string;
  // name: string;
  isSortable: boolean;
  isSorting: boolean;
  direction: Direction;
};

export const isDirectionAsc = (dir: Direction): boolean => dir === 'asc';

export const toggleDirection = (dir: Direction): Direction => (isDirectionAsc(dir) ? 'desc' : 'asc');

export const getAriaSort = (isSortable: boolean, isSorting: boolean, dir: Direction): AriaAttributes['aria-sort'] =>
  isSortable && isSorting ? (isDirectionAsc(dir) ? 'ascending' : 'descending') : 'none';

export const SORT_EVENT_NAME = 'internalSortingChange';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
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
};

type TableComponentType = 'table' | 'table-head' | 'table-head-cell' | 'table-body' | 'table-row' | 'table-cell';

const baseCss: { [key in TableComponentType]: string } = {
  table: getCss(
    buildHostStyles({
      display: 'table !important',
      width: '100% !important',
      borderCollapse: 'collapse !important',
      borderSpacing: '0 !important',
      fontFamily: `${font.family} !important`,
      ...font.size.small,
      whiteSpace: 'nowrap !important',
      overflow: 'auto',
    })
  ),
  'table-head': getCss({
    ...buildHostStyles({
      display: 'table-header-group !important',
      width: '100% !important',
      textAlign: 'left !important',
      fontWeight: `${font.weight.bold} !important`,
      borderBottom: `2px solid ${color.neutralContrast.high} !important`,
    }),
    '::slotted(*)': { border: '0 !important' },
  }),
  'table-head-cell': getCss({
    ...buildHostStyles({
      display: 'table-cell !important',
      // textAlign: 'left !important',
      padding: `0 ${pxToRem(12)}rem ${pxToRem(8)}rem 0 !important`,
      verticalAlign: 'bottom !important',
      '&:last-child': {
        paddingRight: '0 !important',
      },
    }),
    ...buildGlobalStyles({
      button: {
        display: 'flex',
        alignItems: 'center',
        margin: '3px 0 0',
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
        transition: 'color $p-animation-hover-duration $p-animation-hover-bezier',
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
    }),
    icon: {
      opacity: 0,
      marginLeft: 3,
      '&--active': {
        opacity: 1,
      },
    },
  }),
  'table-body': getCss(
    buildHostStyles({
      display: 'table-row-group !important',
      width: '100% !important',
    })
  ),
  'table-row': getCss(
    buildHostStyles({
      display: 'table-row !important',
      width: '100% !important',
      borderBottom: `1px solid ${color.neutralContrast.medium} !important`,
    })
  ),
  'table-cell': getCss({
    ...buildHostStyles({
      display: 'table-cell !important',
      padding: `${pxToRem(12)}rem ${pxToRem(12)}rem ${pxToRem(12)}rem 0 !important`,
      margin: '0 !important',
      verticalAlign: 'middle',
      '&:last-child': {
        paddingRight: '0 !important',
      },
    }),
    '::slotted(*)': {
      verticalAlign: 'middle !important',
    },
  }),
};

export const addCss = (host: HTMLElement): void => {
  const [, tableComponent] = /^(?:.*)-?p-(.*)$/.exec(getTagName(host)) || [];
  // if (tableComponent === 'table-cell') {
  //   console.log(baseCss[tableComponent]);
  // }
  attachCss(host, baseCss[tableComponent]);
};
