import type { JssStyle } from 'jss';
import type { ContentWrapperWidth } from './content-wrapper-utils';
import { getMediaQueryMin, gridWidthMax } from '@porsche-design-system/utilities-v2';
import { gridSpacingMapConfig, offsetHorizontalXXL } from './content-wrapper-spacings-shared';
import type { GridSpacingMap, GridSpacingMapKey } from './content-wrapper-spacings-shared';

type WidthMap = { [key in GridSpacingMapKey]: JssStyle };
const getWidthMapByGridSpacingMap = (gridSpacingMap: GridSpacingMap): WidthMap => {
  const mediaQueryS = getMediaQueryMin('s');
  const mediaQueryXXL = getMediaQueryMin('xxl');
  return Object.entries(gridSpacingMap).reduce(
    (result, [gridSpacingMapKey, gridSpacingMapValue]) => ({
      ...result,
      [gridSpacingMapKey as GridSpacingMapKey]: {
        padding: `0 ${gridSpacingMapValue[0]}`,
        ...Object.entries(gridSpacingMapValue[1]).reduce(
          (newResult, [screenSize, spacing]) => ({
            ...newResult,
            // TODO: find a way to do it better
            [screenSize === 's' ? mediaQueryS : mediaQueryXXL]: {
              padding: `0 ${spacing}`,
            },
          }),
          {} as JssStyle
        ),
      },
    }),
    {} as WidthMap
  );
};

const widthMap = getWidthMapByGridSpacingMap(gridSpacingMapConfig);

export const getContentWrapperStyle = (width: ContentWrapperWidth): JssStyle => {
  return {
    display: 'block',
    margin: 0,
    padding: `0 ${offsetHorizontalXXL}`,
    width: 'auto', // ensure value is set to default width, although style is used in light dom
    minWidth: 0, // needed for some flex context
    maxWidth: gridWidthMax,
    ...widthMap[width],
  };
};
