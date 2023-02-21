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
  textSmallStyle,
  getMediaQueryMin,
  borderRadiusSmall,
  headingXLargeStyle,
  spacingFluidMedium,
  spacingStaticXSmall,
  spacingStaticSmall,
  spacingFluidXSmall,
  fontLineHeight,
  spacingStaticMedium,
  gridGap,
} from '@porsche-design-system/utilities-v2';
import type { CarouselAlignHeader, CarouselWidth } from './carousel-utils';
import { getSpacingForWidth } from '../content-wrapper/content-wrapper-spacings-shared';

export const bulletActiveClass = 'bullet--active';

const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXXL = getMediaQueryMin('xxl');
const headerRowGap = spacingFluidXSmall; // fluid spacing for vertical gap
const headerColumnGap = spacingStaticMedium; // static spacing for horizontal gap
const bulletSize = '8px'; // width and height of a bullet
const activeBulletWidth = '20px';
const navGap = spacingStaticXSmall;
const navBtnPadding = spacingStaticSmall;
// width and height of nav button
const navBtnSize = `calc(${fontLineHeight} + ${navBtnPadding} * 2)`;
// it's equal to inset of "hover :before element" of nav button, so that button in hover state is aligned correctly
const navOffset = '2px';
// nav width is being calculated based on icon width (fontLineHeight), button padding, distance (navGap) between 2 nav buttons and right offset of nav
const navWidth = `calc((${navBtnSize}) * 2 + ${navGap} + ${navOffset})`;
// in a case alignHeader=center is being set - Heading's and Description's "spacing" (left and right) should be equal to the nav's width plus header column gap
const headerAlignCenterSpacing = `${navWidth} + ${headerColumnGap}`;

export const getComponentCss = (
  width: CarouselWidth,
  disablePagination: BreakpointCustomizable<boolean>,
  splideSpeed: number,
  alignHeader: CarouselAlignHeader,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor } = getThemedColors(theme);
  const isHeaderAlignLeft = alignHeader === 'left';
  const bulletTransitionDuration = (splideSpeed / 1000).toString() + 's'; // convert speed from "milliseconds" (400) to "css transition duration" ('0.4s') format
  // get standard spacings for the width - distance from carousel to the left and right borders of the parent
  const [spacingLeftRight, gridSpacing] = getSpacingForWidth(width);
  const spacingLeftRightS = gridSpacing.s;
  const spacingLeftRightSWithFallback = spacingLeftRightS || spacingLeftRight; // in a case "spacingLeftRightS" is undefined (for example for "extended") - use fallback "spacingLeftRight"
  const spacingLeftRightXXL = gridSpacing.xxl;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        maxWidth: gridWidthMax,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: spacingFluidMedium, // vertical spacing
        gridAutoFlow: 'row',
        ...hostHiddenStyles,
      }),
      'h2,::slotted([slot=heading])': addImportantToEachRule({
        ...headingXLargeStyle,
        margin: 0,
        color: primaryColor,
        maxWidth: '900px',
        ...(!isHeaderAlignLeft && {
          // if center-aligned
          margin: '0 auto',
          textAlign: 'center',
        }),
      }),
      'p,::slotted([slot=description])': addImportantToEachRule({
        ...textSmallStyle,
        margin: 0,
        color: primaryColor,
        maxWidth: '550px',
        ...(!isHeaderAlignLeft && {
          // if center-aligned
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
        ...addImportantToEachRule({
          // since we have "cutted slide" on the right side, splide padding right should include also "cuttedSlideOffset" and "gridGap" (distance between slides)
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
      rowGap: headerRowGap,
      padding: `0 ${spacingLeftRight}`,
      font: textSmallStyle.font, // we need the font to be the same as nav font in order to set gridTemplateColumns correctly depending on nav width
      [mediaQueryS]: {
        // only starting from S size and bigger there's nav, therefore header alignment is needed
        ...(isHeaderAlignLeft
          ? {
              gridTemplateColumns: `minmax(0px, 1fr) ${navWidth}`, // 2nd row has width of nav buttons
              columnGap: headerColumnGap,
              // if there's another spacing for s size
              ...(spacingLeftRightS && {
                padding: `0 ${spacingLeftRightS}`,
              }),
            }
          : {
              gridTemplateColumns: 'minmax(0px, 1fr) 0', // first column should take the whole width
              columnGap: 0, // there shouldn't be a gap, because we have only one column
              padding: `0 calc(${spacingLeftRightSWithFallback} + ${headerAlignCenterSpacing})`, // set padding, so that description & heading do not overlap with nav buttons
            }),
        position: 'relative',
        minHeight: navBtnSize, // for a case there's no description and no heading - it's height should be equal to actual height of prev/next buttons
      },
      [mediaQueryXXL]: {
        ...(isHeaderAlignLeft
          ? {
              padding: `0 ${spacingLeftRightXXL}`,
            }
          : {
              padding: `0 calc(${spacingLeftRightXXL} + ${headerAlignCenterSpacing})`, // set padding, so that description & heading do not overlap with nav buttons
            }),
      },
    },
    nav: {
      display: 'none', // for smaller screens we don't show nav buttons
      [mediaQueryS]: {
        display: 'grid',
        gridAutoFlow: 'column',
        gap: navGap,
        position: 'absolute', // we can't span across multiple rows with implicit grid
        right: spacingLeftRightSWithFallback,
        bottom: 0,
        padding: `0 ${navOffset} ${navOffset} 0`, // make offset to the right and the bottom side, so that it's aligned to right & bottom in hover state
      },
      [mediaQueryXXL]: {
        right: spacingLeftRightXXL,
      },
    },
    btn: {
      padding: navBtnPadding,
    },
    ...(disablePagination !== true && {
      pagination: {
        ...buildResponsiveStyles(disablePagination, (value: boolean) => ({ display: value ? 'none' : 'block' })),
        display: 'flex',
        margin: '0 auto', // center-aligned
        gap: spacingStaticSmall,
      },
      bullet: {
        borderRadius: borderRadiusSmall,
        background: contrastMediumColor,
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
