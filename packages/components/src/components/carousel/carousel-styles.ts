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
  fontSizeTextSmall,
  getMediaQueryMax,
  getMediaQueryMin,
  gridBasicOffset,
  gridBasicOffsetBase,
  gridExtendedOffset,
  gridGap,
  headingXLargeStyle,
  spacingFluidMedium,
  spacingFluidXSmall,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

export const carouselTransitionDuration = 400;
export const bulletActiveClass = 'bullet--active';

const selectorHeading = 'h2,::slotted([slot=heading])';
const selectorDescription = 'p,::slotted([slot=description])';
const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXXL = getMediaQueryMin('xxl');

// we need an explicit grid template, therefor we need to calculate the button group width
const buttonSize = `calc(${spacingStaticSmall} * 2 + ${fontLineHeight})`;
// + 2px, compensates hover offset of button-pure
const buttonGroupWidth = `calc(${buttonSize} * 2 + ${spacingStaticXSmall} + 2px)`;

const spacingMap: { [key in CarouselWidth]: { base: string; s: string; xxl: string } } = {
  basic: gridBasicOffset,
  extended: gridExtendedOffset,
};

export const getComponentCss = (
  width: CarouselWidth,
  hasPagination: BreakpointCustomizable<boolean>,
  alignHeader: CarouselAlignHeader,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor } = getThemedColors(theme);
  const isHeaderAlignCenter = alignHeader === 'center';

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'flex',
        gap: spacingFluidMedium,
        flexDirection: 'column',
        boxSizing: 'content-box', // ensures padding is added to host instead of subtracted
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
              gridColumn: 2,
              textAlign: 'center', // relevant when text becomes multiline
            }
          : {
              gridColumn: '1 / 3',
            },
      }),
    },
    header: {
      display: 'grid',
      padding: `0 ${spacingMap[width].base}`,
      [mediaQueryS]: {
        fontFamily, // relevant for button group width calculation, which is based on ex unit
        fontSize: fontSizeTextSmall, // relevant for button group width calculation, which is based on ex unit
        columnGap: spacingStaticMedium,
        gridTemplateColumns: `${buttonGroupWidth} minmax(0px, 1fr) ${buttonGroupWidth}`,
        ...(isHeaderAlignCenter && {
          justifyItems: 'center', // relevant when max-width of heading or description is reached
        }),
        padding: `0 ${spacingMap[width].s}`,
      },
      [mediaQueryXXL]: {
        padding: `0 ${spacingMap[width].xxl}`,
      },
    },
    nav: {
      display: 'none',
      [mediaQueryS]: {
        display: 'flex',
        gap: spacingStaticXSmall,
        gridArea: '1 / 3 / 3 / auto', // needed in case description height is smaller than button group
        alignItems: 'end',
      },
    },
    btn: {
      padding: spacingStaticSmall,
    },
    splide: {
      overflow: 'hidden',
      // visibility: 'hidden',
      '&__track': {
        cursor: 'grab',
        // !important is necessary to override inline styles set by splide library
        ...addImportantToEachRule({
          padding: `0 ${spacingMap[width].base}`,
          [getMediaQueryMax('xs')]: {
            paddingRight: `calc(${gridBasicOffsetBase} + ${gridGap})`, // we need to give cut off slides a bit more space on mobile views
          },
          [mediaQueryS]: {
            padding: `0 ${spacingMap[width].s}`,
          },
          [mediaQueryXXL]: {
            padding: `0 ${spacingMap[width].xxl}`,
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
    ...(hasPagination && {
      pagination: {
        ...buildResponsiveStyles(hasPagination, (hasPaginationValue: boolean) => ({
          display: hasPaginationValue ? 'flex' : 'none',
        })),
        justifyContent: 'center',
        gap: spacingStaticSmall,
      },
      bullet: {
        borderRadius: borderRadiusSmall,
        background: contrastMediumColor,
        // set transition to have the same speed as switching slides in splide
        transition: `background-color ${carouselTransitionDuration}ms, width ${carouselTransitionDuration}ms`,
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
