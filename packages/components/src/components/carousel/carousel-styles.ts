import type { BreakpointCustomizable, Theme } from '../../types';
import type { CarouselAlignHeader, CarouselWidth } from './carousel-utils';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToRule,
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  colorSchemeStyles,
} from '../../styles';
import {
  borderRadiusLarge,
  borderRadiusSmall,
  borderWidthBase,
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
export const paginationInfiniteStartCaseClass = 'pagination--infinite';
export const bulletInfiniteClass = 'bullet--infinite';

export const paginationBulletSize = '8px';
const paginationInfiniteBulletSize = '4px';
const paginationActiveBulletSize = '20px';

const selectorHeading = 'h2,::slotted([slot=heading])';
const selectorDescription = 'p,::slotted([slot=description])';
const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXXL = getMediaQueryMin('xxl');

// we need an explicit grid template, therefor we need to calculate the button group width
const buttonSize = `calc(${spacingStaticSmall} * 2 + ${fontLineHeight})`;
// + 2px, compensates hover offset of button-pure
const buttonGroupWidth = `calc(${buttonSize} * 3 + ${spacingStaticXSmall} + 2px)`;

const spacingMap: { [key in CarouselWidth]: { base: string; s: string; xxl: string } } = {
  basic: gridBasicOffset,
  extended: gridExtendedOffset,
};

export const getComponentCss = (
  width: CarouselWidth,
  hasPagination: BreakpointCustomizable<boolean>,
  isInfinitePagination: boolean,
  alignHeader: CarouselAlignHeader,
  hasNavigation: boolean,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, focusColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastMediumColor: contrastMediumColorDark,
    focusColor: focusColorDark,
  } = getThemedColors('dark');
  const { canvasTextColor } = getHighContrastColors();
  const isHeaderAlignCenter = alignHeader === 'center';

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'flex',
        gap: spacingFluidMedium,
        flexDirection: 'column',
        boxSizing: 'content-box', // ensures padding is added to host instead of subtracted
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
      '::slotted(*)': {
        borderRadius: addImportantToRule(`var(--p-carousel-border-radius, ${borderRadiusLarge})`),
      },
      '::slotted(*:focus-visible)': addImportantToEachRule({
        outline: `${borderWidthBase} solid ${focusColor}`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          outlineColor: focusColorDark,
        }),
        outlineOffset: '2px',
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
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
        [mediaQueryS]: isHeaderAlignCenter
          ? {
              gridColumn: 2,
            }
          : {
              gridColumn: '1 / 3',
            },
      }),
    },
    header: {
      display: 'grid',
      padding: `0 ${spacingMap[width].base}`,
      ...(isHeaderAlignCenter && {
        textAlign: 'center',
      }),
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
        justifyContent: 'end',
        justifySelf: 'end',
      },
    },
    btn: {
      padding: spacingStaticSmall,
    },
    'skip-link': {
      opacity: 0,
      pointerEvents: 'none',
      '&:focus': {
        opacity: 1,
        pointerEvents: 'all',
      },
    },
    splide: {
      overflow: 'hidden',
      padding: '4px 0', // for slide focus outline
      margin: '-4px 0', // for slide focus outline
      '&__track': {
        ...(hasNavigation && {
          cursor: 'grab',
        }),
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
        ...getBackfaceVisibilityJssStyle(),
      },
      '&__slide': {
        flexShrink: 0,
        ...getBackfaceVisibilityJssStyle(),
        transform: 'translateZ(0)', // fixes mobile safari flickering, https://github.com/nolimits4web/swiper/issues/3527#issuecomment-609088939
      },
      '&__sr': getHiddenTextJssStyle(), // appears in the DOM when sliding
    },
    ...(hasPagination && {
      ['pagination-container']: {
        ...buildResponsiveStyles(hasPagination, (hasPaginationValue: boolean) => ({
          display: hasPaginationValue ? 'flex' : 'none',
        })),
        position: 'relative',
        justifyContent: isInfinitePagination ? 'flex-start' : 'center',
        width: `calc(${paginationActiveBulletSize} + ${paginationBulletSize} * 4 + ${spacingStaticSmall} * 4)`, // Width for five bullets (one active + spacing)
        left: 'calc(50% - 42px)',
        overflowX: 'hidden',
      },
      pagination: {
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        height: paginationBulletSize, // Needed to avoid jumping when rewinding dynamically added slides
        gap: spacingStaticSmall,
        transition: `transform ${carouselTransitionDuration}ms`,
      },
      bullet: {
        borderRadius: borderRadiusSmall,
        ...(isHighContrastMode
          ? {
              background: canvasTextColor,
            }
          : {
              background: contrastMediumColor,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                background: contrastMediumColorDark,
              }),
            }),
        ...(isInfinitePagination
          ? {
              width: '0px',
              height: '0px',
              transition: `background-color ${carouselTransitionDuration}ms, width ${carouselTransitionDuration}ms, height ${carouselTransitionDuration}ms`,
            }
          : {
              width: paginationBulletSize,
              height: paginationBulletSize,
              transition: `background-color ${carouselTransitionDuration}ms, width ${carouselTransitionDuration}ms`,
            }),
      },
      ...(isInfinitePagination && {
        [`${paginationInfiniteStartCaseClass}`]: {
          ['& > .bullet:nth-child(-n+4)']: {
            width: paginationBulletSize,
            height: paginationBulletSize,
          },
        },
        [`${bulletInfiniteClass}`]: {
          // Necessary to override the bulletActiveClass sibling selector
          ...addImportantToEachRule({
            width: paginationInfiniteBulletSize,
            height: paginationInfiniteBulletSize,
          }),
          '& ~ span': {
            width: paginationBulletSize,
            height: paginationBulletSize,
          },
          [`& ~ .${bulletInfiniteClass} ~ span`]: {
            width: '0px',
            height: '0px',
          },
        },
      }),
      [`${bulletActiveClass}`]: {
        ...(isHighContrastMode
          ? {
              background: canvasTextColor,
            }
          : {
              background: primaryColor,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                background: primaryColorDark,
              }),
            }),
        height: paginationBulletSize,
        width: addImportantToRule(paginationActiveBulletSize),
        ...(isInfinitePagination && {
          '& ~ span': {
            width: paginationBulletSize,
            height: paginationBulletSize,
          },
          [`& ~ .${bulletInfiniteClass} ~ span`]: {
            width: '0px',
            height: '0px',
          },
        }),
      },
    }),
  });
};
