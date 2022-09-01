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

  const backfaceVisibility: JssStyle = {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
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
        // to override inline styles set by splide library
        ...(wrapContent &&
          addImportantToEachRule({
            padding: `0 calc(${gridSafeZone.base} + 7%) 0 ${gridSafeZone.base}`,
            [mediaQueryXl]: {
              padding: `0 calc(${gridSafeZone.xl} + 7%) 0 ${gridSafeZone.xl}`,
            },
          })),
        '&--draggable': {
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
        },
      },
      '&__list': {
        display: 'flex',
        height: '100%',
        ...backfaceVisibility,
      },
      '&__slide': {
        position: 'relative',
        flexShrink: 0,
        ...backfaceVisibility,
        transform: 'translateZ(0)', // fixes mobile safari flickering, https://github.com/nolimits4web/swiper/issues/3527#issuecomment-609088939
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
        minHeight: pxToRemWithUnit(40), // actual height of prev/next buttons
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
        right: wrapContent ? gridSafeZone.base : 0,
        bottom: 0,
      },
      ...(wrapContent && {
        [mediaQueryXl]: {
          right: gridSafeZone.xl,
        },
      }),
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
