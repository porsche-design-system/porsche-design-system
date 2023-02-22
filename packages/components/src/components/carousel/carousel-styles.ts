import type { BreakpointCustomizable, Theme } from '../../types';
import type { CarouselAlignHeader, CarouselWidth } from './carousel-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  hostHiddenStyles,
} from '../../styles';
import {
  borderRadiusSmall,
  fontFamily,
  fontLineHeight,
  getMediaQueryMin,
  gridGap,
  gridWidthMax,
  headingXLargeStyle,
  spacingFluidMedium,
  spacingFluidXSmall,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getSpacingForWidth } from '../content-wrapper/content-wrapper-spacings-shared';

export const bulletActiveClass = 'bullet--active';
const selectorHeading = 'h2,::slotted([slot=heading])';
const selectorDescription = 'p,::slotted([slot=description])';
const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXXL = getMediaQueryMin('xxl');

// we need an explicit grid template, therefor we need to calculate the button group width
const buttonGroupWidth = `calc((${spacingStaticSmall} * 2 + ${fontLineHeight}) * 2 + ${spacingStaticXSmall})`;

export const getComponentCss = (
  width: CarouselWidth,
  disablePagination: BreakpointCustomizable<boolean>,
  splideSpeed: number,
  alignHeader: CarouselAlignHeader,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor } = getThemedColors(theme);
  const bulletTransitionDuration = `${splideSpeed}ms`;

  // TODO: needs to be moved over to utils
  const isHeaderAlignCenter = alignHeader === 'center';

  // TODO: needs to be simplified/cleaned somehow
  // get standard spacings for the width - distance from carousel to the left and right borders of the parent
  const [spacingLeftRight, gridSpacing] = getSpacingForWidth(width);
  const spacingLeftRightS = gridSpacing.s;
  const spacingLeftRightSWithFallback = spacingLeftRightS || spacingLeftRight; // in a case "spacingLeftRightS" is undefined (for example for "extended") - use fallback "spacingLeftRight"
  const spacingLeftRightXXL = gridSpacing.xxl;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'flex',
        gap: spacingFluidMedium,
        flexDirection: 'column',
        maxWidth: gridWidthMax,
        marginLeft: 'auto', // relevant for viewport width > 2560px
        marginRight: 'auto', // relevant for viewport width > 2560px
        ...hostHiddenStyles,
      }),
      [selectorHeading]: addImportantToEachRule({
        ...headingXLargeStyle,
        maxWidth: '56.25rem',
        margin: 0,
      }),
      [selectorDescription]: addImportantToEachRule({
        ...textSmallStyle,
        maxWidth: '34.375rem',
        margin: `${spacingFluidXSmall} 0 0`,
      }),
      [`${selectorHeading},${selectorDescription}`]: addImportantToEachRule({
        color: primaryColor,
        [mediaQueryS]: isHeaderAlignCenter
          ? {
              gridColumnStart: 2,
              textAlign: 'center', // relevant when text becomes multiline
            }
          : {
              gridColumn: '1 / 3',
            },
      }),
    },
    splide: {
      overflow: 'hidden',
      // visibility: 'hidden',
      '&__track': {
        cursor: 'grab',
        // to override inline styles set by splide library
        ...addImportantToEachRule({
          // since we have "cutted slide" on the right side, splide padding right should include also "gridGap" (distance between slides)
          padding: `0 calc(${spacingLeftRight} + ${gridGap}) 0 ${spacingLeftRight}`,
          [mediaQueryS]: {
            padding: `0 ${spacingLeftRightSWithFallback}`,
          },
          [mediaQueryXXL]: {
            padding: `0 ${spacingLeftRightXXL}`,
          },
        }),
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
      padding: `0 ${spacingLeftRight}`,
      [mediaQueryS]: {
        fontFamily, // relevant for button group width calculation, which is based on ex unit
        padding: `0 ${spacingLeftRightSWithFallback}`,
        columnGap: spacingStaticMedium,
        gridTemplateColumns: `${buttonGroupWidth} minmax(0px, 1fr) ${buttonGroupWidth}`,
        ...(isHeaderAlignCenter && {
          justifyItems: 'center',
        }),
      },
      [mediaQueryXXL]: {
        padding: `0 ${spacingLeftRightXXL}`,
      },
    },
    nav: {
      display: 'none',
      [mediaQueryS]: {
        display: 'flex',
        gap: spacingStaticXSmall,
        alignItems: 'end',
      },
    },
    btn: {
      padding: spacingStaticSmall,
    },
    ...(!disablePagination && {
      pagination: {
        ...buildResponsiveStyles(disablePagination, (disablePaginationValue: boolean) => ({
          display: disablePaginationValue ? 'none' : 'flex',
        })),
        justifyContent: 'center',
        gap: spacingStaticSmall,
      },
      bullet: {
        borderRadius: borderRadiusSmall,
        background: contrastMediumColor,
        // set transition to have the same speed as switching slides in splide
        transition: `background-color ${bulletTransitionDuration} linear, width ${bulletTransitionDuration} linear`,
        width: '8px',
        height: '8px',
      },
      [bulletActiveClass]: {
        background: primaryColor,
        width: '20px',
      },
    }),
  });
};
