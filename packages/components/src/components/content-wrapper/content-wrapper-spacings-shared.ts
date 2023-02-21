import type { ContentWrapperWidth } from './content-wrapper-utils';
import { gridGap, gridSafeZoneBase, gridSafeZoneXXL, gridWidthMax } from '@porsche-design-system/utilities-v2';

type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>; // possibility to define some keys to be optional
const oneColumnWidthS = `calc((100% - ${gridSafeZoneBase} * 2 - ${gridGap} * 13) / 14)`;
const oneColumnWidthXXL = `calc((min(100%, ${gridWidthMax}) - ${gridSafeZoneXXL} * 2 - ${gridGap} * 13) / 14)`;
export const offsetHorizontalXXL = `max(0px, (100% - ${gridWidthMax}) / 2)`;

export type GridSpacingWidth = Exclude<ContentWrapperWidth, 'full' | 'fluid'>;
// I think it's better (safer) to explicitly define, which keys are optional and which not. If the format changes in the future - we can adjust the type
export type GridSpacingDataForWidth = [string, PartiallyOptional<{ [key in 's' | 'xxl']: string }, 's'>]; // 's' is an optional key
export type GridSpacingMap = { [key in GridSpacingWidth]: GridSpacingDataForWidth };

export const gridSpacingMapConfig: GridSpacingMap = {
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

export const getSpacingForWidth = (gridSpacingMapKey: GridSpacingWidth): GridSpacingDataForWidth =>
  gridSpacingMapConfig[gridSpacingMapKey];
