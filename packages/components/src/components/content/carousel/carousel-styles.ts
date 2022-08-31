import type { BreakpointCustomizable, Theme } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import { addImportantToEachRule, getScreenReaderOnlyJssStyle, getThemedColors, pxToRemWithUnit } from '../../../styles';
import {
  gridMaxWidth,
  gridSafeZone,
  headingMedium,
  textSmall,
  mediaQueryMin,
} from '@porsche-design-system/utilities-v2';
import type { JssStyle } from 'jss';

export const bulletActiveClass = 'bullet--active';

const mediaQueryS = mediaQueryMin('s');
const mediaQueryXl = mediaQueryMin('xl');

export const getComponentCss = (
  wrapContent: boolean,
  disablePagination: BreakpointCustomizable<boolean>,
  theme: Theme
): string => {
  const { baseColor, disabledColor } = getThemedColors(theme);

  const safeZonePadding: JssStyle = wrapContent && {
    padding: `0 ${gridSafeZone.base}`,
    [mediaQueryXl]: {
      padding: `0 ${gridSafeZone.xl}`,
    },
  };

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        maxWidth: gridMaxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: pxToRemWithUnit(24),
        gridAutoFlow: 'row',
        [mediaQueryXl]: {
          gap: pxToRemWithUnit(32),
        },
      }),
      'h2,::slotted([slot=heading])': addImportantToEachRule({
        ...headingMedium,
        margin: 0,
        color: baseColor,
      }),
      '::slotted([slot=post-heading])': addImportantToEachRule({
        ...textSmall,
        margin: 0,
        color: baseColor,
        gridColumn: 1, // to force it into 2nd line
      }),
    },
    splide: {
      overflow: 'hidden',
      // visibility: 'hidden',
      '&__track': {
        cursor: 'grab',
        '&--draggable': {
          userSelect: 'none',
          WebkitTouchCallout: 'none',
        },
      },
      '&__list': {
        display: 'flex',
        height: '100%',
        backfaceVisibility: 'hidden',
        ...safeZonePadding,
      },
      '&__slide': {
        position: 'relative',
        // boxSizing: 'border-box',
        flexShrink: 0,
        backfaceVisibility: 'hidden',
      },
      '&__sr': getScreenReaderOnlyJssStyle(), // appears in the DOM when sliding
    },
    // .splide.is-initialized,
    // .splide.is-rendered {
    //     visibility: visible,
    //   }
    // .splide.is-initialized:not(.is-active) .splide__list {
    //     display: block,
    //   }
    header: {
      ...safeZonePadding,
      [mediaQueryS]: {
        display: 'grid',
        gridTemplateColumns: `minmax(0px, 1fr) ${pxToRemWithUnit(80)}`, // 2nd row has width of nav buttons
        gap: pxToRemWithUnit(16),
        position: 'relative',
      },
      [mediaQueryXl]: {
        gap: pxToRemWithUnit(24),
      },
    },
    nav: {
      display: 'none',
      [mediaQueryS]: {
        display: 'grid',
        gridAutoFlow: 'column',
        position: 'absolute', // we can't span across multiple rows with implicit grid
        right: gridSafeZone.base,
        bottom: 0,
        background: 'purple',
      },
      [mediaQueryXl]: {
        right: gridSafeZone.xl,
      },
    },
    btn: {
      padding: pxToRemWithUnit(8),
    },
    ...(disablePagination !== true && {
      pagination: {
        ...buildResponsiveStyles(disablePagination, (value: boolean) => ({ display: value ? 'none' : 'grid' })),
        gridAutoColumns: pxToRemWithUnit(8),
        gridAutoFlow: 'column',
        justifyContent: 'center',
        gap: pxToRemWithUnit(8),
        height: pxToRemWithUnit(8),
      },
      bullet: {
        borderRadius: pxToRemWithUnit(4),
        background: disabledColor,
      },
      [bulletActiveClass]: {
        background: baseColor,
      },
    }),
  });
};
