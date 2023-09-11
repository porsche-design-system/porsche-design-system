import type { ContentWrapperWidth } from './content-wrapper-utils';
import { getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import {
  getMediaQueryMin,
  gridFullOffset,
  gridNarrowOffset,
  gridBasicOffset,
  gridExtendedOffset,
} from '@porsche-design-system/utilities-v2';

const widthMap: { [key in Exclude<ContentWrapperWidth, 'full' | 'fluid'>]: { base: string; s: string; xxl: string } } =
  {
    narrow: gridNarrowOffset,
    basic: gridBasicOffset,
    extended: gridExtendedOffset,
  };

export const getComponentCss = (width: ContentWrapperWidth): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
    root: {
      minWidth: 0, // needed for some flex context
      ...(['full', 'fluid'].includes(width)
        ? {
            padding: `0 ${gridFullOffset}`,
          }
        : {
            padding: `0 ${widthMap[width].base}`,
            [getMediaQueryMin('s')]: {
              padding: `0 ${widthMap[width].s}`,
            },
            [getMediaQueryMin('xxl')]: {
              padding: `0 ${widthMap[width].xxl}`,
            },
          }),
    },
  });
};
