import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../types';
import type { CarouselAlignHeader, CarouselWidth } from './carousel-utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
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
  getMediaQueryMax,
  getMediaQueryMin,
  gridGap,
  gridSafeZoneBase,
  gridSafeZoneXXL,
  gridWidthMax,
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
const buttonGroupWidth = `calc(${buttonSize} * 2 + ${spacingStaticXSmall})`;

// we don't need to abstract spacing definitions since component content-wrapper is deprecated and will be removed soon
const gridColumn1FrS = `calc((100% - ${gridSafeZoneBase} * 2 - ${gridGap} * 13) / 14)`;
const gridColumn1FrXXL = `calc((min(100%, ${gridWidthMax}) - ${gridSafeZoneXXL} * 2 - ${gridGap} * 13) / 14)`;

const spacingMap: { [key in CarouselWidth]: JssStyle } = {
  basic: {
    padding: `0 ${gridSafeZoneBase}`,
    [mediaQueryS]: {
      padding: `0 calc(${gridSafeZoneBase} + ${gridGap} + ${gridColumn1FrS})`,
    },
    [mediaQueryXXL]: {
      padding: `0 calc(${gridSafeZoneXXL} + ${gridGap} + ${gridColumn1FrXXL})`,
    },
  },
  extended: {
    padding: `0 ${gridSafeZoneBase}`,
    [mediaQueryXXL]: {
      padding: `0 ${gridSafeZoneXXL}`,
    },
  },
};

export const getComponentCss = (
  width: CarouselWidth,
  disablePagination: BreakpointCustomizable<boolean>,
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
        maxWidth: gridWidthMax,
        // relevant for viewport width > 2560px
        paddingLeft: `calc(50% - ${gridWidthMax} / 2)`, // padding instead of margin to be able to set a background color
        paddingRight: `calc(50% - ${gridWidthMax} / 2)`, // padding instead of margin to be able to set a background color
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
      ...mergeDeep(spacingMap[width], {
        [mediaQueryS]: {
          fontFamily, // relevant for button group width calculation, which is based on ex unit
          columnGap: spacingStaticMedium,
          gridTemplateColumns: `${buttonGroupWidth} minmax(0px, 1fr) ${buttonGroupWidth}`,
          ...(isHeaderAlignCenter && {
            justifyItems: 'center', // relevant when max-width of heading or description is reached
          }),
        },
      }),
    },
    nav: {
      display: 'none',
      background: 'rgba(255, 0, 0, 0.1)',
      [mediaQueryS]: {
        display: 'flex',
        gap: spacingStaticXSmall,
        gridArea: '1 / 3 / 3 / auto', // needed in case description height is smaller than button group
        alignItems: 'end',
      },
    },
    btn: {
      background: 'rgba(0, 0, 255, 0.1)',
      padding: spacingStaticSmall,
    },
    splide: {
      overflow: 'hidden',
      // visibility: 'hidden',
      '&__track': {
        cursor: 'grab',
        // !important is necessary to override inline styles set by splide library
        ...addImportantToEachRule({
          ...spacingMap[width],
          [getMediaQueryMax('xs')]: {
            paddingRight: `calc(${gridSafeZoneBase} + ${gridGap})`, // we need to give cut off slides a bit more space on mobile views
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
