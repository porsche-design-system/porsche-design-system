import type { BreakpointCustomizable, Theme } from '../../types';
import type { CarouselAlignHeader, CarouselHeadingSize, CarouselWidth } from './carousel-utils';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import {
  borderRadiusLarge,
  borderRadiusSmall,
  borderWidthBase,
  getMediaQueryMax,
  getMediaQueryMin,
  gridBasicOffset,
  gridBasicOffsetBase,
  gridExtendedOffset,
  gridGap,
  headingXLargeStyle,
  headingXXLargeStyle,
  motionDurationModerate,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { JssStyle } from 'jss';

const cssVariablePrevNextFilter = '--p-carousel-prev-next-filter';
export const carouselTransitionDuration = motionDurationModerate;
export const paginationInfiniteStartCaseClass = 'pagination--infinite';
export const bulletClass = 'bullet';
export const bulletActiveClass = 'bullet--active';
export const bulletInfiniteClass = 'bullet--infinite';

const paginationVisibleBulletCount = 5;
const paginationBulletSize = '8px';
const paginationInfiniteBulletSize = '4px';
const paginationActiveBulletSize = '20px';

const paginationGap = '8px';
const paginationWidth = `calc(${paginationActiveBulletSize} + ${paginationBulletSize} * ${
  paginationVisibleBulletCount - 1
} + ${paginationGap} * ${paginationVisibleBulletCount - 1})`; // Width for one active bullet + width of inactive bullets + spacing

const paginationInset = '8px'; // Used to increase clickable area on touch devices
const paginationGapLarge = '16px';
const paginationWidthLarge = `calc(${paginationActiveBulletSize} + ${paginationBulletSize} * ${
  paginationVisibleBulletCount - 1
} + ${paginationGapLarge} * ${paginationVisibleBulletCount - 1} + 2 * ${paginationInset})`; // Width for one active bullet + width of inactive bullets + spacing

const selectorHeading = 'h2,::slotted([slot="heading"])';
const selectorDescription = 'p,::slotted([slot="description"])';
const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXXL = getMediaQueryMin('xxl');
const mediaQueryPointerCoarse = '@media (pointer: coarse)';

const spacingMap: Record<CarouselWidth, { base: string; s: string; xxl: string }> = {
  basic: gridBasicOffset,
  extended: gridExtendedOffset,
};

const backfaceVisibilityJssStyle: JssStyle = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

export const getComponentCss = (
  hasHeading: boolean,
  hasDescription: boolean,
  hasControlsSlot: boolean,
  headingSize: CarouselHeadingSize,
  width: CarouselWidth,
  hasPagination: BreakpointCustomizable<boolean>,
  isInfinitePagination: boolean,
  alignHeader: CarouselAlignHeader,
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
      ':host': {
        display: 'flex',
        ...addImportantToEachRule({
          gap: spacingFluidMedium, // TODO: maybe it's better to style by margin on .splide, then styles would be part of shadow dom
          flexDirection: 'column',
          boxSizing: 'content-box', // ensures padding is added to host instead of subtracted
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...(hasControlsSlot && {
        ['slot[name="controls"]']: {
          display: 'block',
          gridColumnStart: 1,
          gridRowStart: 3,
          alignSelf: 'center', // ensures vertical alignment to prev/next buttons
        },
      }),
      ...addImportantToEachRule({
        '::slotted(*)': {
          borderRadius: `var(--p-carousel-border-radius, ${borderRadiusLarge})`,
        },
        '::slotted(*:focus-visible)': {
          outline: `${borderWidthBase} solid ${focusColor}`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            outlineColor: focusColorDark,
          }),
          outlineOffset: '2px',
        },
        // TODO: maybe it's better to style with slot[name="heading"] and slot[name="description"] instead, then styles would be part of shadow dom
        // h2,::slotted([slot=heading]),p,::slotted([slot=description])
        ...((hasHeading || hasDescription) && {
          [`${selectorHeading},${selectorDescription}`]: {
            gridColumn: '1/-1',
            color: primaryColor,
            ...(isHeaderAlignCenter && {
              textAlign: 'center', // relevant in case heading or description becomes multiline
              justifySelf: 'center', // relevant for horizontal alignment of heading and description in case max-width applies
            }),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              color: primaryColorDark,
            }),
          },
        }),
        // h2,::slotted([slot=heading])
        ...(hasHeading && {
          [selectorHeading]: {
            maxWidth: '56.25rem',
            margin: `0 0 ${!hasDescription ? spacingFluidMedium : 0}`,
            ...(headingSize === 'xx-large' ? headingXXLargeStyle : headingXLargeStyle),
          },
        }),
        // p,::slotted([slot=description])
        ...(hasDescription && {
          [selectorDescription]: {
            maxWidth: '34.375rem',
            margin: `${spacingFluidSmall} 0 ${spacingFluidMedium}`,
            ...textSmallStyle,
          },
        }),
      }),
    },
    header: {
      display: 'grid',
      padding: `0 ${spacingMap[width].base}`,
      [mediaQueryS]: {
        gridTemplateColumns: 'minmax(0px, 1fr) auto',
        columnGap: spacingStaticMedium,
        padding: `0 ${spacingMap[width].s}`,
      },
      [mediaQueryXXL]: {
        padding: `0 ${spacingMap[width].xxl}`,
      },
    },
    nav: {
      display: 'none',
      [mediaQueryS]: {
        gridRowStart: '3',
        gridColumnEnd: '-1',
        display: 'flex',
        gap: spacingStaticXSmall,
        alignSelf: 'flex-start', // relevant in case slot="header" becomes higher than nav group
      },
      filter: `var(${cssVariablePrevNextFilter}, none)`,
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
          cursor: 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
        },
      },
      '&__list': {
        ...backfaceVisibilityJssStyle,
        display: 'flex',
      },
      '&__slide': {
        ...backfaceVisibilityJssStyle,
        flexShrink: 0,
        transform: 'translateZ(0)', // fixes mobile safari flickering, https://github.com/nolimits4web/swiper/issues/3527#issuecomment-609088939
      },
      '&__sr': getHiddenTextJssStyle(), // appears in the DOM when sliding
    },
    ...(hasPagination && {
      'pagination-container': {
        ...buildResponsiveStyles(hasPagination, (hasPaginationValue: boolean) => ({
          display: hasPaginationValue ? 'flex' : 'none',
        })),
        position: 'relative',
        justifyContent: isInfinitePagination ? 'flex-start' : 'center',
        width: paginationWidth,
        left: `calc(50% - (${paginationWidth}) / 2)`,
        [mediaQueryPointerCoarse]: {
          width: paginationWidthLarge,
          left: `calc(50% - ${paginationWidthLarge} / 2)`,
        },
        overflowX: 'hidden',
      },
      pagination: {
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        height: paginationBulletSize, // Needed to avoid jumping when rewinding dynamically added slides
        gap: paginationGap,
        [mediaQueryPointerCoarse]: {
          height: `calc(${paginationBulletSize} + 2 * ${paginationInset})`,
          gap: paginationGapLarge,
        },
        transition: `transform ${carouselTransitionDuration}`,
      },
      [bulletClass]: {
        // Increase clickable area on touch devices
        [mediaQueryPointerCoarse]: {
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: `-${paginationInset}`,
          },
          position: 'relative',
        },
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
              transition: `background-color ${carouselTransitionDuration}, width ${carouselTransitionDuration}, height ${carouselTransitionDuration}`,
            }
          : {
              width: paginationBulletSize,
              height: paginationBulletSize,
              transition: `background-color ${carouselTransitionDuration}, width ${carouselTransitionDuration}`,
            }),
        ...hoverMediaQuery({
          cursor: 'pointer',
        }),
      },
      ...(isInfinitePagination && {
        [paginationInfiniteStartCaseClass]: {
          [`& > .${bulletClass}:nth-child(-n+4)`]: {
            width: paginationBulletSize,
            height: paginationBulletSize,
          },
        },
        [bulletInfiniteClass]: {
          // Necessary to override the bulletActiveClass sibling selector
          ...addImportantToEachRule({
            width: paginationInfiniteBulletSize,
            height: paginationInfiniteBulletSize,
          }),
          [`& ~ .${bulletClass}`]: {
            width: paginationBulletSize,
            height: paginationBulletSize,
          },
          [`& ~ .${bulletInfiniteClass} ~ .${bulletClass}`]: {
            width: '0px',
            height: '0px',
          },
        },
      }),
      [bulletActiveClass]: {
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
          [`& ~ .${bulletClass}`]: {
            width: paginationBulletSize,
            height: paginationBulletSize,
          },
          [`& ~ .${bulletInfiniteClass} ~ .${bulletClass}`]: {
            width: '0px',
            height: '0px',
          },
        }),
      },
    }),
  });
};
