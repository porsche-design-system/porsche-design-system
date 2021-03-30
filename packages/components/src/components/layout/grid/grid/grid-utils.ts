import { mediaQuery } from '@porsche-design-system/utilities';
import type { BreakpointCustomizable } from '../../../../types';
import type { GetStylesFunction, JssStyle } from '../../../../utils';
import { attachCss, buildResponsiveJss, getCss, mergeDeep } from '../../../../utils';

export const GRID_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
type GridDirectionType = typeof GRID_DIRECTIONS[number];
export type GridDirection = BreakpointCustomizable<GridDirectionType>;

export const GRID_WRAPS = ['nowrap', 'wrap'] as const;
type GridWrapType = typeof GRID_WRAPS[number];
export type GridWrap = BreakpointCustomizable<GridWrapType>;

const pxToRem = (px: number): number => px / 16;
export const paddingBase = `${pxToRem(16) / 2}rem !important`;
export const paddingS = `${pxToRem(24) / 2}rem !important`;
export const paddingM = `${pxToRem(36) / 2}rem !important`;

const baseCss: string = getCss({
  ':host': {
    display: 'flex !important',
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

const getDirectionStyles: GetStylesFunction = (direction: GridDirectionType): JssStyle => ({
  flexDirection: `${direction} !important`,
});

const getWrapStyles: GetStylesFunction = (wrap: GridWrap): JssStyle => ({
  flexWrap: `${wrap} !important`,
});

export const getDynamicCss = (direction: GridDirection, wrap: GridWrap): string => {
  return getCss(mergeDeep(buildResponsiveJss(direction, getDirectionStyles), buildResponsiveJss(wrap, getWrapStyles)));
};

export const addCss = (host: HTMLElement, direction: GridDirection, wrap: GridWrap): void => {
  attachCss(host, baseCss + getDynamicCss(direction, wrap));
};
