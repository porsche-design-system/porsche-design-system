import type { JssStyle } from 'jss';
import type { ContentWrapperWidth } from './content-wrapper-utils';
import { getMediaQueryMin, gridSafeZoneBase, gridSafeZoneXXL, gridWidthMax } from '@porsche-design-system/utilities-v2';

const widthMap: { [key in ContentWrapperWidth]?: JssStyle } = {
  basic: {
    margin: '0 auto',
    padding: `0 ${gridSafeZoneBase}`,
    maxWidth: gridWidthMax,
    boxSizing: 'border-box',
    [getMediaQueryMin('xxl')]: {
      padding: `0 ${gridSafeZoneXXL}`,
    },
  },
  extended: {
    margin: '0 auto',
    maxWidth: gridWidthMax,
  },
};

// TODO: maybe this should be part of utilities sub package as "getGridWrapperStyle"?
export const getContentWrapperStyle = (width: ContentWrapperWidth): JssStyle => {
  return {
    width: '100%',
    minWidth: 0, // needed for possible flex context within content-wrapper
    ...widthMap[width],
  };
};
