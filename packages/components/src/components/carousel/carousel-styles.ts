import type { BreakpointCustomizable, Theme } from '../../types';
import type { CarouselAlignHeader, CarouselHeadingSize, CarouselWidth } from './carousel-utils';
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
  headingXXLargeStyle,
  motionDurationModerate,
  spacingFluidMedium,
  spacingFluidXSmall,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

export const carouselTransitionDuration = motionDurationModerate;
export const bulletActiveClass = 'bullet--active';
export const paginationInfiniteStartCaseClass = 'pagination--infinite';
export const bulletInfiniteClass = 'bullet--infinite';

export const paginationBulletSize = '8px';
const paginationInfiniteBulletSize = '4px';
const paginationActiveBulletSize = '20px';

const selectorHeading = 'h2,::slotted([slot=heading])';
const selectorDescription = 'p,::slotted([slot=description])';
const selectorHeader = '::slotted([slot=header])';
const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXXL = getMediaQueryMin('xxl');

// we need an explicit grid template, therefor we need to calculate the button group width
const buttonSize = `calc(${spacingStaticSmall} * 2 + ${fontLineHeight})`;
// + 2px, compensates hover offset of button-pure
const buttonGroupWidth = `calc(${buttonSize} * 3 + ${spacingStaticXSmall} + 2px)`;

const spacingMap: Record<CarouselWidth, { base: string; s: string; xxl: string }> = {
  basic: gridBasicOffset,
  extended: gridExtendedOffset,
};

export const getComponentCss = (
  hasHeading: boolean,
  hasDescription: boolean,
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
          gap: spacingFluidMedium,
          flexDirection: 'column',
          boxSizing: 'content-box', // ensures padding is added to host instead of subtracted
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
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
        ...(hasHeading && {
          [selectorHeading]: {
            ...(headingSize === 'x-large' ? headingXLargeStyle : headingXXLargeStyle),
            maxWidth: '56.25rem',
            margin: 0,
          },
        }),
        ...(hasDescription && {
          [selectorDescription]: {
            ...textSmallStyle,
            maxWidth: '34.375rem',
            margin: `${spacingFluidXSmall} 0 0`,
          },
        }),
        [`${hasHeading ? selectorHeading + ',' : ''}${
          hasDescription ? selectorDescription + ',' : ''
        }${selectorHeader}`]: {
          color: primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
          }),
          alignSelf: 'center', // relevant for vertical alignment of header
          ...(isHeaderAlignCenter && {
            justifySelf: 'center', // relevant for horizontal alignment of header
          }),
          [mediaQueryS]: isHeaderAlignCenter
            ? {
                gridColumn: 2,
              }
            : {
                gridColumn: '1 / 3',
              },
        },
      }),
    },
    header: {
      display: 'grid',
      gridTemplateRows: `${hasHeading ? 'auto ' : ''}${hasDescription ? 'auto ' : ''}auto`,
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
        gridArea: `${hasHeading ? (hasDescription ? '3' : '2') : '1'} / 3 / 3 / auto`, // needed in case header height is smaller than button group
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
      'pagination-container': {
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
        transition: `transform ${carouselTransitionDuration}`,
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
              transition: `background-color ${carouselTransitionDuration}, width ${carouselTransitionDuration}, height ${carouselTransitionDuration}`,
            }
          : {
              width: paginationBulletSize,
              height: paginationBulletSize,
              transition: `background-color ${carouselTransitionDuration}, width ${carouselTransitionDuration}`,
            }),
      },
      ...(isInfinitePagination && {
        [paginationInfiniteStartCaseClass]: {
          '& > .bullet:nth-child(-n+4)': {
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
