import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { mediaQuery, pxToRemWithUnit } from '../common-styles';

export const getGridSkeletonStyles = (): string => {
  const getGutterRem = (gutter): string => `-${pxToRemWithUnit(gutter / 2)}`;
  const gridItemWidth = 8.333333;

  return getMinifiedStyles({
    '@global': {
      'p-grid': {
        '&:not(.hydrated)': {
          display: 'flex',
          flex: 'auto',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
      },
      'p-grid-item': {
        '&:not(.hydrated)': {
          boxSizing: 'border-box',
          // width: `${gridItemWidth}%`,
          minWidth: `${gridItemWidth}%`,
          marginLeft: '0%',
          paddingLeft: getGutterRem(16),
          paddingRight: getGutterRem(16),
          [mediaQuery('s')]: {
            paddingLeft: getGutterRem(24),
            paddingRight: getGutterRem(24),
          },
          [mediaQuery('m')]: {
            paddingLeft: getGutterRem(36),
            paddingRight: getGutterRem(36),
          },
        },
      },
    },
  });
};
