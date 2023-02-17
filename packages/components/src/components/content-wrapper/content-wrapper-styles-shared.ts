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

type ScreenSize = 's' | 'xxl';
type GridSpacingMapKey = Exclude<ContentWrapperWidth, 'full' | 'fluid'>;
type GridSpacingMapValue = [string, Partial<{ [key in ScreenSize]: string }>];
type GridSpacingMap = { [key in GridSpacingMapKey]: GridSpacingMapValue };
type WidthMap = { [key in GridSpacingMapKey]: JssStyle };

const gridSpacingMapConfig: GridSpacingMap = {
  narrow: [
    gridSafeZoneBase,
    {
      s: `calc(${gridSafeZoneBase} + ${gridGap} * 3 + ${oneColumnWidthS} * 3)`,
      xxl: `calc(${offsetHorizontalXXL} + ${gridSafeZoneXXL} + ${gridGap} * 3 + ${oneColumnWidthXXL} * 3)`,
    },
  ],
  basic: [
    gridSafeZoneBase,
    {
      s: `calc(${gridSafeZoneBase} + ${gridGap} + ${oneColumnWidthS})`,
      xxl: `calc(${offsetHorizontalXXL} + ${gridSafeZoneXXL} + ${gridGap} + ${oneColumnWidthXXL})`,
    },
  ],
  extended: [
    gridSafeZoneBase,
    {
      xxl: `calc(${offsetHorizontalXXL} + ${gridSafeZoneXXL})`,
    },
  ],
};

export const getSpacingForWidth = (gridSpacingMapKey: GridSpacingMapKey): GridSpacingMapValue =>
  gridSpacingMapConfig[gridSpacingMapKey];
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
