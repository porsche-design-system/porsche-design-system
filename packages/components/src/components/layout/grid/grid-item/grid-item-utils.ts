import { breakpoint, mediaQuery, pxToRem } from '@porsche-design-system/utilities';
import type { Styles } from '../../../../utils';
import { attachCss, getCss } from '../../../../utils';
import type { BreakpointCustomizable } from '../../../../types';

const GRID_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
type GridSizeType = typeof GRID_SIZES[number];
export type GridSize = BreakpointCustomizable<GridSizeType>;

const GRID_OFFSETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
type GridOffsetType = typeof GRID_OFFSETS[number];
export type GridOffset = BreakpointCustomizable<GridOffsetType>;

const paddingBase = `${parseFloat(pxToRem('16px')) / 2}rem !important`;
const paddingS = `${parseFloat(pxToRem('24px')) / 2}rem !important`;
const paddingM = `${parseFloat(pxToRem('36px')) / 2}rem !important`;

export const baseCss: string = getCss({
  ':host': {
    boxSizing: 'border-box !important',
    paddingLeft: paddingBase,
    paddingRight: paddingBase,
  },
  [mediaQuery('s')]: {
    ':host': {
      paddingLeft: paddingS,
      paddingRight: paddingS,
    },
  },
  [mediaQuery('m')]: {
    ':host': {
      paddingLeft: paddingM,
      paddingRight: paddingM,
    },
  },
});

const gridItemWidths = [
  0,
  8.333333,
  16.666667,
  25,
  33.333333,
  41.666667,
  50,
  58.333333,
  66.666667,
  75,
  83.333333,
  91.666667,
  100,
];

const getSizeStyles = (size: GridSizeType): Styles => ({
  width: `${gridItemWidths[size]}% !important`,
});

const getOffsetStyles = (offset: GridOffsetType): Styles =>
  offset === 0
    ? {}
    : {
        marginLeft: `${gridItemWidths[offset]}% !important`,
      };

const getJssX = <T>(rawValue: T, getStyles: (x: T) => Styles): Styles => {
  // TODO: stop using eval
  // eslint-disable-next-line no-eval
  const value: BreakpointCustomizable<T> = eval(`(${rawValue})`);

  return typeof value === 'number'
    ? {
        ':host': getStyles(value),
      }
    : Object.keys(value)
        .filter((key) => key !== 'base')
        .reduce(
          (res, bp) => ({
            ...res,
            [mediaQuery(breakpoint[bp])]: {
              ':host': getStyles(value[bp]),
            },
          }),
          {
            ':host': getStyles((value as any).base),
          }
        );
};

const getJss = (size: GridSize, offset: GridOffset): Styles => {
  const jss = getJssX(size, getSizeStyles);

  for (const [key, styles] of Object.entries(getJssX(offset, getOffsetStyles))) {
    jss[key] = Object.assign({}, jss[key], styles);
  }

  return jss;
};

export const addCss = (host: HTMLElement, size: GridSize, offset: GridOffset): void => {
  const dynamicCss = getCss(getJss(size, offset));
  attachCss(host, baseCss + dynamicCss);
};
