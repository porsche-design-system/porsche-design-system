import type { JssStyle } from 'jss';
import type { ContentWrapperWidth } from './content-wrapper-utils';
import {
  getMediaQueryMin,
  gridGap,
  gridSafeZoneBase,
  gridSafeZoneXXL,
  gridWidthMax,
} from '@porsche-design-system/utilities-v2';

const oneColumnWidthS = `calc((100% - ${gridSafeZoneBase} * 2 - ${gridGap} * 13) / 14)`;
const oneColumnWidthXXL = `calc((min(100%, ${gridWidthMax}) - ${gridSafeZoneXXL} * 2 - ${gridGap} * 13) / 14)`;
const offsetHorizontalXXL = `max(0px, (100% - ${gridWidthMax}) / 2)`;

const widthMap: { [key in Exclude<ContentWrapperWidth, 'full' | 'fluid'>]: JssStyle } = {
  narrow: {
    padding: `0 ${gridSafeZoneBase}`,
    [getMediaQueryMin('s')]: {
      padding: `0 calc(${gridSafeZoneBase} + ${gridGap} * 3 + ${oneColumnWidthS} * 3)`,
    },
    [getMediaQueryMin('xxl')]: {
      padding: `0 calc(${offsetHorizontalXXL} + ${gridSafeZoneXXL} + ${gridGap} * 3 + ${oneColumnWidthXXL} * 3)`,
    },
  },
  basic: {
    padding: `0 ${gridSafeZoneBase}`,
    [getMediaQueryMin('s')]: {
      padding: `0 calc(${gridSafeZoneBase} + ${gridGap} + ${oneColumnWidthS})`,
    },
    [getMediaQueryMin('xxl')]: {
      padding: `0 calc(${offsetHorizontalXXL} + ${gridSafeZoneXXL} + ${gridGap} + ${oneColumnWidthXXL})`,
    },
  },
  extended: {
    padding: `0 ${gridSafeZoneBase}`,
    [getMediaQueryMin('xxl')]: {
      padding: `0 calc(${offsetHorizontalXXL} + ${gridSafeZoneXXL})`,
    },
  },
};

export const getContentWrapperStyle = (width: ContentWrapperWidth): JssStyle => {
  return {
    width: '100%',
    padding: `0 ${offsetHorizontalXXL}`,
    minWidth: 0, // needed for some flex context
    maxWidth: gridWidthMax,
    ...widthMap[width],
  };
};
