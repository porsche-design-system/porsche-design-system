import type { BreakpointCustomizable, Theme } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import { addImportantToEachRule, getScreenReaderOnlyJssStyle, getThemedColors, pxToRemWithUnit } from '../../../styles';
import { gridSafeZone, headingMedium, headingSmall, mediaQueryMin } from '@porsche-design-system/utilities-v2';
import type { JssStyle } from 'jss';

export const bulletActiveClass = 'bullet--active';

const mediaQueryS = mediaQueryMin('s');
const mediaQueryXl = mediaQueryMin('xl');
const mediaQueryXxl = mediaQueryMin('xxl');

export const getComponentCss = (
  wrapHeading: boolean,
  disablePagination: BreakpointCustomizable<boolean>,
  overflowVisible: boolean,
  theme: Theme
): string => {
  const { baseColor, disabledColor } = getThemedColors(theme);
  const headingResetStyles: JssStyle = {
    margin: 0,
    color: baseColor,
  };

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        width: '100%',
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
        ...headingResetStyles,
      }),
      '::slotted([slot=subheading])': addImportantToEachRule({
        ...headingSmall,
        ...headingResetStyles,
        gridColumn: 1,
        margin: `${pxToRemWithUnit(8)} 0 0`,
      }),
    },
    splide: {
      position: 'relative',
      minWidth: 0,
      cursor: 'grab',
      // visibility: 'hidden',
      '&__track': {
        position: 'relative',
        ...(!overflowVisible && { overflow: 'hidden' }),
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
      '&__sr': getScreenReaderOnlyJssStyle(),
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
      [mediaQueryS]: {
        gridTemplateColumns: 'minmax(0px, 1fr) min-content min-content',
        alignItems: 'end',
        gap: pxToRemWithUnit(8),
      },
      ...(wrapHeading && {
        padding: `0 ${gridSafeZone.base}`,
        [mediaQueryXl]: {
          padding: `0 ${gridSafeZone.xl}`,
        },
      }),
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
        gridAutoColumns: '8px',
        gridAutoFlow: 'column',
        justifyContent: 'center',
        gap: '8px',
        height: '8px',
      },
      bullet: {
        borderRadius: '4px',
        background: disabledColor,
      },
      [bulletActiveClass]: {
        background: baseColor,
      },
    }),
  });
};
