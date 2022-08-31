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
const mediaQueryXxl = mediaQueryMin('xxl');

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
        margin: '0 auto',
        gap: pxToRemWithUnit(24),
        gridAutoFlow: 'row',
        [mediaQueryS]: {
          gap: pxToRemWithUnit(40),
        },
        [mediaQueryXxl]: {
          gap: pxToRemWithUnit(62),
        },
      }),
      'h2,::slotted([slot=heading])': addImportantToEachRule({
        ...headingMedium,
        margin: 0,
        color: baseColor,
      }),
      '::slotted([slot=description])': addImportantToEachRule({
        ...textSmall,
        gridColumn: 1,
        margin: `${pxToRemWithUnit(8)} 0 0`,
        color: baseColor,
      }),
    },
    splide: {
      position: 'relative',
      minWidth: 0,
      cursor: 'grab',
      overflow: 'hidden',
      ...safeZonePadding,
      // visibility: 'hidden',
      '&__track': {
        position: 'relative',
        '&--draggable': {
          userSelect: 'none',
          WebkitTouchCallout: 'none',
        },
      },
      '&__list': {
        display: 'flex',
        height: '100%',
        backfaceVisibility: 'hidden',
      },
      '&__slide': {
        position: 'relative',
        boxSizing: 'border-box',
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
      display: 'grid',
      gridTemplateColumns: 'minmax(0px, 1fr) 0 0',
      ...safeZonePadding,
      [mediaQueryS]: {
        gridTemplateColumns: 'minmax(0px, 1fr) min-content min-content',
        alignItems: 'end',
        gap: pxToRemWithUnit(8),
        minHeight: pxToRemWithUnit(42), // actual height of prev/next buttons to prevent cut off focus outline
        // padding: '0 2px 0 0', // offset of button focus outline so it isn't cut off when padding on parent exists
      },
    },
    btn: {
      visibility: 'hidden',
      [mediaQueryS]: {
        visibility: 'visible',
        padding: pxToRemWithUnit(8),
      },
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
