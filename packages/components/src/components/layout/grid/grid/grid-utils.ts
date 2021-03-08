import { mediaQuery, pxToRem } from '@porsche-design-system/utilities';
import type { Styles } from '../../../../utils';
import { attachCss, buildResponsiveJss, getCss } from '../../../../utils';
import type { BreakpointCustomizable } from '../../../../types';

const GRID_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];
type GridDirectionType = typeof GRID_DIRECTIONS[number];
export type GridDirection = BreakpointCustomizable<GridDirectionType>;

export const paddingBase = `${parseFloat(pxToRem('16px')) / 2}rem !important`;
export const paddingS = `${parseFloat(pxToRem('24px')) / 2}rem !important`;
export const paddingM = `${parseFloat(pxToRem('36px')) / 2}rem !important`;

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

const getDirectionStyles = (direction: GridDirection): Styles => ({
  flexDirection: `${direction} !important`,
});

export const addCss = (host: HTMLElement, direction: GridDirection): void => {
  const dynamicCss = getCss(buildResponsiveJss(direction, getDirectionStyles));
  attachCss(host, baseCss + dynamicCss);
};
