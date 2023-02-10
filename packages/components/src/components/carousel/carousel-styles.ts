import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  hostHiddenStyles,
} from '../../styles';
import {
  gridWidthMax,
  gridSafeZoneBase,
  textSmallStyle,
  getMediaQueryMin,
  borderRadiusSmall,
  headingXLargeStyle,
  spacingFluidMedium,
  spacingStaticXSmall,
  spacingStaticSmall,
  spacingFluidXSmall,
  spacingFluidLarge,
  fontLineHeight,
  spacingStaticMedium,
} from '@porsche-design-system/utilities-v2';
import { CarouselAlignHeader } from './carousel-utils';

export const bulletActiveClass = 'bullet--active';

const mediaQueryS = getMediaQueryMin('s');

const headerRowGap = spacingFluidXSmall;
const headerColumnGap = spacingStaticMedium;
const bulletSize = '8px';
const activeBulletWidth = '20px';
const navGap = spacingStaticXSmall;
const navBtnPadding = spacingStaticSmall;
// nav button is a square, so it's width is equal to it's height
const navBtnWidthHeight = `calc(${fontLineHeight} + ${navBtnPadding} * 2)`;
// it's equal to inset of "hover :before element" of nav button, so that button in hover state is aligned correctly
const navOffset = '2px';
// nav width is being calculated based on icon width (fontLineHeight), button padding, distance (navGap) between 2 nav buttons and right offset of nav
const navWidth = `calc((${navBtnWidthHeight}) * 2 + ${navGap} + ${navOffset})`;
// in a case alignHeader=center is being set - Heading's and Description's "spacing" (left and right) should be equal to the nav's width plus header column gap
const headerAlignCenterSpacing = `${navWidth} + ${headerColumnGap}`;

export const getComponentCss = (
  wrapContent: boolean,
  disablePagination: BreakpointCustomizable<boolean>,
  splideSpeed: number,
  alignHeader: CarouselAlignHeader,
  theme: Theme
): string => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  const isAlignLeft = alignHeader === 'left';
  const bulletTransitionDuration = (splideSpeed / 1000).toString() + 's'; // convert speed from "milliseconds" (400) to "css transition duration" ('0.4s') format

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        maxWidth: gridWidthMax,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: spacingFluidMedium,
        gridAutoFlow: 'row',
        ...hostHiddenStyles,
      }),
      'h2,::slotted([slot=heading])': addImportantToEachRule({
        ...headingXLargeStyle,
        margin: 0,
        color: primaryColor,
        maxWidth: '900px',
        ...(!isAlignLeft && {
          margin: '0 auto',
          textAlign: 'center',
        }),
      }),
      'p,::slotted([slot=description])': addImportantToEachRule({
        ...textSmallStyle,
        margin: 0,
        color: primaryColor,
        maxWidth: '550px',
        ...(!isAlignLeft && {
          margin: '0 auto',
          textAlign: 'center',
        }),
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
            // TODO: 0 calc(${gridSafeZoneBase} + ${gridGap}) - will be done after Grid Refactoring
            padding: `0 calc(${gridSafeZoneBase} + ${spacingFluidLarge}) 0 ${gridSafeZoneBase}`,
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
      rowGap: headerRowGap,
      padding: wrapContent ? `0 ${gridSafeZoneBase}` : null,
      font: textSmallStyle.font, // we need the font to be the same as nav font in order to set gridTemplateColumns correctly depending on nav width
      [mediaQueryS]: {
        // only starting from S size and bigger there's nav
        ...(isAlignLeft
          ? {
              gridTemplateColumns: `minmax(0px, 1fr) ${navWidth}`, // 2nd row has width of nav buttons
              columnGap: headerColumnGap,
            }
          : {
              gridTemplateColumns: 'minmax(0px, 1fr) 0', // first column should take the whole width
              columnGap: 0, // there shouldn't be a gap, because we have only one column
              padding: wrapContent // set padding, so that description & heading do not overlap with nav buttons
                ? `0 calc(${gridSafeZoneBase} + ${headerAlignCenterSpacing})`
                : `0 calc(${headerAlignCenterSpacing})`,
            }),
        position: 'relative',
        minHeight: navBtnWidthHeight, // actual height of prev/next buttons (for a case there's no description and no heading)
      },
    },
    nav: {
      display: 'none',
      [mediaQueryS]: {
        display: 'grid',
        gridAutoFlow: 'column',
        gap: navGap,
        position: 'absolute', // we can't span across multiple rows with implicit grid
        right: wrapContent ? gridSafeZoneBase : 0,
        bottom: 0,
        padding: `0 ${navOffset} ${navOffset} 0`, // make offset to the right and the bottom side, so that it's aligned to right & bottom in hover state
      },
    },
    btn: {
      padding: navBtnPadding,
    },
    ...(disablePagination !== true && {
      pagination: {
        ...buildResponsiveStyles(disablePagination, (value: boolean) => ({ display: value ? 'none' : 'block' })),
        display: 'flex',
        margin: '0 auto',
        gap: spacingStaticSmall,
        lineHeight: bulletSize,
      },
      bullet: {
        borderRadius: borderRadiusSmall,
        background: disabledColor,
        // set transition to have the same speed as switching slides in splide
        transition: `background-color ${bulletTransitionDuration} linear, width ${bulletTransitionDuration} linear`,
        width: bulletSize,
        height: bulletSize,
      },
      [bulletActiveClass]: {
        background: primaryColor,
        width: activeBulletWidth,
      },
    }),
  });
};
