import {
  getMediaQueryMin,
  gridBasicOffset,
  gridExtendedOffset,
  gridFullOffset,
  gridWideOffset,
  headingXLargeStyle,
  headingXXLargeStyle,
  motionDurationModerate,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  colors,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { legacyRadiusLarge, radius4Xl, radiusFull } from '../../styles/css-variables';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { CarouselAlignControls, CarouselAlignHeader, CarouselHeadingSize, CarouselWidth } from './carousel-utils';

/**
 * @css-variable {"name": "--p-carousel-px", "description": "Defines the logical inline start and end padding of the carousel, the extra space is used to show parts of the next/previous slide. When used then the prop `width` has no effect anymore.", "defaultValue": ""}
 */
export const cssVarPaddingInline = '--p-carousel-px';

/**
 * @css-variable {"name": "--p-carousel-ps", "description": "Defines the logical inline start padding of the carousel, the extra space is used to show parts of the next/previous slide. Needs to be used in combination with `--p-carousel-px` or `--p-carousel-pe`. When used then the prop `width` has no effect anymore.", "defaultValue": ""}
 */
export const cssVarPaddingInlineStart = '--p-carousel-ps';

/**
 * @css-variable {"name": "--p-carousel-pe", "description": "Defines the logical inline end padding of the carousel, the extra space is used to show parts of the next/previous slide. Needs to be used in combination with `--p-carousel-px` or `--p-carousel-ps`. When used then the prop `width` has no effect anymore.", "defaultValue": ""}
 */
export const cssVarPaddingInlineEnd = '--p-carousel-pe';

export const cssVariableGradientColorWidth = '--p-gradient-color-width';
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

const selectorHeading = '.heading';
const selectorDescription = 'p,::slotted([slot="description"])';
const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXXL = getMediaQueryMin('xxl');
const mediaQueryPointerCoarse = '@media (pointer: coarse)';

const spacingMap: Record<CarouselWidth, { base: string; s: string; xxl: string }> = {
  basic: gridBasicOffset,
  extended: gridExtendedOffset,
  wide: gridWideOffset,
  full: {
    base: gridFullOffset,
    s: gridFullOffset,
    xxl: gridFullOffset
  },
};

const backfaceVisibilityJssStyle: JssStyle = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

const { primaryColor, contrastMediumColor } = colors;

const gradientMask = `linear-gradient(90deg,transparent 20%,#000 var(${cssVariableGradientColorWidth},33%) calc(100% - var(${cssVariableGradientColorWidth},33%)),transparent 80%)`;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (
  gradient: boolean,
  hasHeading: boolean,
  hasDescription: boolean,
  hasControlsSlot: boolean,
  headingSize: CarouselHeadingSize,
  width: CarouselWidth,
  hasPagination: BreakpointCustomizable<boolean>,
  isInfinitePagination: boolean,
  alignHeader: CarouselAlignHeader,
  hasNavigation: boolean,
  alignControls: CarouselAlignControls
): string => {
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
      ...preventFoucOfNestedElementsStyles,
      ...(hasControlsSlot && {
        'slot[name="controls"]': {
          display: 'block',
          gridColumn: '1/-1',
          gridRowStart: 3,
          alignSelf: 'center', // ensures vertical alignment to prev/next buttons
          justifySelf: alignControls !== 'auto' ? alignControls : isHeaderAlignCenter ? 'center' : 'start',
          [mediaQueryS]: {
            gridColumn: alignControls !== 'center' && hasNavigation ? '1/2' : '1/-1',
            justifySelf:
              alignControls !== 'auto' ? alignControls : isHeaderAlignCenter && !hasNavigation ? 'center' : 'start',
          },
        },
      }),
      ...addImportantToEachRule({
        '::slotted': {
          '&(*)': {
            borderRadius: `var(--p-carousel-border-radius, var(${legacyRadiusLarge}, ${radius4Xl}))`,
          },
        },
        // TODO: maybe it's better to style with slot[name="heading"] and slot[name="description"] instead, then styles would be part of shadow dom
        // .heading,p,::slotted([slot=description])
        ...((hasHeading || hasDescription) && {
          [`${selectorHeading},${selectorDescription}`]: {
            gridColumn: '1/-1',
            color: primaryColor,
            ...(isHeaderAlignCenter && {
              textAlign: 'center', // relevant in case heading or description becomes multiline
              justifySelf: 'center', // relevant for horizontal alignment of heading and description in case max-width applies
            }),
          },
        }),
        ...(hasHeading && {
          [selectorHeading]: {
            maxWidth: '56.25rem',
            margin: `0 0 ${hasDescription ? 0 : spacingFluidMedium}`,
            ...(headingSize === 'xx-large' ? headingXXLargeStyle : headingXLargeStyle),
          },
          '::slotted([slot=heading])': {
            margin: 0, // reset ua-style
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
      paddingInlineStart: `var(${cssVarPaddingInlineStart},var(${cssVarPaddingInline},${spacingMap[width].base}))`,
      paddingInlineEnd: `var(${cssVarPaddingInlineEnd},var(${cssVarPaddingInline},${spacingMap[width].base}))`,
      [mediaQueryS]: {
        gridTemplateColumns: 'minmax(0px,1fr) auto',
        paddingInlineStart: `var(${cssVarPaddingInlineStart},var(${cssVarPaddingInline},${spacingMap[width].s}))`,
        paddingInlineEnd: `var(${cssVarPaddingInlineEnd},var(${cssVarPaddingInline},${spacingMap[width].s}))`,
        ...(hasNavigation && { columnGap: spacingStaticMedium }),
      },
      [mediaQueryXXL]: {
        paddingInlineStart: `var(${cssVarPaddingInlineStart},var(${cssVarPaddingInline},${spacingMap[width].xxl}))`,
        paddingInlineEnd: `var(${cssVarPaddingInlineEnd},var(${cssVarPaddingInline},${spacingMap[width].xxl}))`,
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
    },
    btn: {
      padding: spacingStaticSmall,
    },
    'skip-link': {
      // :focus must be used in this case, because :focus-visible is just matched on the focusable element itself, not on the host element.
      '&:not(:focus)': {
        opacity: 0,
        pointerEvents: 'none',
      },
    },
    splide: {
      overflow: 'hidden',
      padding: '4px 0', // for slide focus outline
      margin: '-4px 0', // for slide focus outline
      '&__track': {
        position: 'relative',
        ...(gradient && {
          WebkitMask: gradientMask,
          mask: gradientMask,
        }),
        // !important is necessary to override inline styles set by splide library
        ...addImportantToEachRule({
          paddingBlock: '0px',
          paddingInlineStart: `var(${cssVarPaddingInlineStart},var(${cssVarPaddingInline},${spacingMap[width].base}))`,
          paddingInlineEnd: `var(${cssVarPaddingInlineEnd},var(${cssVarPaddingInline},${spacingMap[width].base}))`,
          [mediaQueryS]: {
            paddingInlineStart: `var(${cssVarPaddingInlineStart},var(${cssVarPaddingInline},${spacingMap[width].s}))`,
            paddingInlineEnd: `var(${cssVarPaddingInlineEnd},var(${cssVarPaddingInline},${spacingMap[width].s}))`,
          },
          [mediaQueryXXL]: {
            paddingInlineStart: `var(${cssVarPaddingInlineStart},var(${cssVarPaddingInline},${spacingMap[width].xxl}))`,
            paddingInlineEnd: `var(${cssVarPaddingInlineEnd},var(${cssVarPaddingInline},${spacingMap[width].xxl}))`,
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
        borderRadius: `var(--p-carousel-border-radius, var(${legacyRadiusLarge}, ${radius4Xl}))`,
        '&:focus-visible': getFocusBaseStyles(),
      },
      '&__sr': getHiddenTextJssStyle(), // appears in the DOM when sliding
      ...(isHeaderAlignCenter && {
        '&:not(.is-overflow) .splide__list': {
          justifyContent: 'center',
        },
        '&:not(.is-overflow) .splide__slide:last-child': {
          marginInlineEnd: addImportantToRule('0'),
        },
      }),
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
        borderRadius: radiusFull,
        background: contrastMediumColor,
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
        background: primaryColor,
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
