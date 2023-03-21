import type { ContentWrapperWidth } from './content-wrapper-utils';
import { getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  getMediaQueryMin,
  gridColumnWidthS,
  gridColumnWidthXXL,
  gridGap,
  gridSafeZoneBase,
  gridSafeZoneS,
  gridSafeZoneXXL,
  gridWidthMax,
} from '@porsche-design-system/utilities-v2';

const columnAmount: { [key in Exclude<ContentWrapperWidth, 'full' | 'fluid'>]: number } = {
  narrow: 4,
  basic: 2,
  extended: 1,
};

const offsetHorizontalXXL = `max(0px, (100% - ${gridWidthMax}) / 2)`;

const paddingHorizontalBase = gridSafeZoneBase;
const paddingHorizontalS = (width: ContentWrapperWidth): string =>
  `calc(${gridSafeZoneS} + (${gridGap} + ${gridColumnWidthS}) * ${columnAmount[width]})`;
const paddingHorizontalXXL = (width: ContentWrapperWidth): string =>
  `calc(${offsetHorizontalXXL} + ${gridSafeZoneXXL} + (${gridGap} + ${gridColumnWidthXXL}) * ${columnAmount[width]})`;

export const getComponentCss = (width: ContentWrapperWidth): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
    },
    root: {
      display: 'block',
      margin: 0,
      width: 'auto', // ensure value is set to default width, although style is used in light dom
      minWidth: 0, // needed for some flex context
      maxWidth: gridWidthMax,
      ...(['full', 'fluid'].includes(width)
        ? {
            padding: `0 ${offsetHorizontalXXL}`,
          }
        : {
            padding: `0 ${paddingHorizontalBase}`,
            [getMediaQueryMin('s')]: {
              padding: `0 ${paddingHorizontalS(width)}`,
            },
            [getMediaQueryMin('xxl')]: {
              padding: `0 ${paddingHorizontalXXL(width)}`,
            },
          }),
    },
  });
};
