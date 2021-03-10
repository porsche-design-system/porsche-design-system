import { mediaQuery } from '@porsche-design-system/utilities';
import type { JssStyle } from '../../../../utils';
import { attachCss, buildResponsiveJss, getCss } from '../../../../utils';
import type { BreakpointCustomizable } from '../../../../types';

export const GRID_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
type GridDirectionType = typeof GRID_DIRECTIONS[number];
export type GridDirection = BreakpointCustomizable<GridDirectionType>;

const pxToRem = (px: number): number => px / 16;
export const paddingBase = `${pxToRem(16) / 2}rem !important`;
export const paddingS = `${pxToRem(24) / 2}rem !important`;
export const paddingM = `${pxToRem(36) / 2}rem !important`;

const baseCss: string = getCss({
  ':host': {
    display: 'flex !important',
    flexWrap: 'wrap !important',
    flex: 'auto !important',
    width: 'auto !important',
    marginLeft: '-' + paddingBase,
    marginRight: '-' + paddingBase,
  },
  [mediaQuery('s')]: {
    ':host': {
      marginLeft: '-' + paddingS,
      marginRight: '-' + paddingS,
    },
  },
  [mediaQuery('m')]: {
    ':host': {
      marginLeft: '-' + paddingM,
      marginRight: '-' + paddingM,
    },
  },
});

const getDirectionStyles = (direction: GridDirection): JssStyle => ({
  flexDirection: `${direction} !important`,
});

export const getDynamicCss = (direction: GridDirection): string => {
  return getCss(buildResponsiveJss(direction, getDirectionStyles));
};

export const addCss = (host: HTMLElement, direction: GridDirection): void => {
  attachCss(host, baseCss + getDynamicCss(direction));
};
