import type { JssStyle } from 'jss';
import type { ContentWrapperWidth } from './content-wrapper-utils';
import {
  getMediaQueryMin,
  gridGap,
  gridSafeZoneBase,
  gridSafeZoneXXL,
  gridWidthMax,
  gridWidthMin,
} from '@porsche-design-system/utilities-v2';

const oneColumnWidthS = `calc((100% - ${gridSafeZoneBase} * 2 - ${gridGap} * 13) / 14)`;
const oneColumnWidthXXL = `calc((min(100%, ${gridWidthMax}) - ${gridSafeZoneXXL} * 2 - ${gridGap} * 13) / 14)`;

const widthMap: { [key in Exclude<ContentWrapperWidth, 'full' | 'fluid'>]: JssStyle } = {
  narrow: {
    padding: `0 ${gridSafeZoneBase}`,
    boxSizing: 'border-box',
    [getMediaQueryMin('s')]: {
      padding: `0 calc(${gridSafeZoneBase} + ${gridGap} * 3 + ${oneColumnWidthS} * 3)`,
    },
    [getMediaQueryMin('xxl')]: {
      padding: `0 calc(${gridSafeZoneXXL} + ${gridGap} * 3 + ${oneColumnWidthXXL} * 3)`,
    },
  },
  basic: {
    padding: `0 ${gridSafeZoneBase}`,
    boxSizing: 'border-box',
    [getMediaQueryMin('s')]: {
      padding: `0 calc(${gridSafeZoneBase} + ${gridGap} + ${oneColumnWidthS})`,
    },
    [getMediaQueryMin('xxl')]: {
      padding: `0 calc(${gridSafeZoneXXL} + ${gridGap} + ${oneColumnWidthXXL})`,
    },
  },
  extended: {
    padding: `0 ${gridSafeZoneBase}`,
    boxSizing: 'border-box',
    [getMediaQueryMin('xxl')]: {
      padding: `0 ${gridSafeZoneXXL}`,
    },
  },
};

export const getContentWrapperStyle = (width: ContentWrapperWidth): JssStyle => {
  return {
    width: '100%',
    margin: '0 auto',
    minWidth: gridWidthMin,
    maxWidth: gridWidthMax,
    ...widthMap[width],
  };
};
