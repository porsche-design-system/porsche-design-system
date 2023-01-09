import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  pxToRemWithUnit,
} from '../../styles';
import {
  gridWidth,
  gridSafeZone,
  headingMediumStyle,
  textSmallStyle,
  getMediaQueryMin,
  gridGap,
} from '@porsche-design-system/utilities-v2';

export const bulletActiveClass = 'bullet--active';

const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXl = getMediaQueryMin('xl');

export const getComponentCss = (
  wrapContent: boolean,
  disablePagination: BreakpointCustomizable<boolean>,
  theme: Theme
): string => {
  const { primaryColor, disabledColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        maxWidth: gridWidth.max,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: pxToRemWithUnit(24),
        gridAutoFlow: 'row',
        [mediaQueryXl]: {
          gap: pxToRemWithUnit(32),
        },
      }),
      'h2,::slotted([slot=heading])': addImportantToEachRule({
        ...headingMediumStyle,
        margin: 0,
        color: primaryColor,
        maxWidth: pxToRemWithUnit(900),
      }),
      'p,::slotted([slot=description])': addImportantToEachRule({
        ...textSmallStyle,
        margin: 0,
        color: primaryColor,
        maxWidth: pxToRemWithUnit(550),
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
            // TODO: 0 calc(${gridSafeZone} + ${gridGap})
            padding: `0 calc(${gridSafeZone} + 7%) 0 ${gridSafeZone}`,
            [mediaQueryXl]: {
              padding: `0 calc(${gridSafeZone} + 7%) 0 ${gridSafeZone}`,
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
        ...getBackfaceVisibilityJssStyle(),
      },
      '&__slide': {
        position: 'relative',
        flexShrink: 0,
        ...getBackfaceVisibilityJssStyle(),
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
      display: 'grid',
      gap: gridGap,
      padding: wrapContent ? `0 ${gridSafeZone}` : null,
      [mediaQueryS]: {
        gridTemplateColumns: `minmax(0px, 1fr) ${pxToRemWithUnit(80)}`, // 2nd row has width of nav buttons
        position: 'relative',
        minHeight: pxToRemWithUnit(40), // actual height of prev/next buttons
      },
    },
    nav: {
      display: 'none',
      [mediaQueryS]: {
        display: 'grid',
        gridAutoFlow: 'column',
        position: 'absolute', // we can't span across multiple rows with implicit grid
        right: wrapContent ? gridSafeZone : 0,
        bottom: 0,
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
        background: primaryColor,
      },
    }),
  });
};
