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
} from '@porsche-design-system/utilities-v2';
import { HeaderAlign } from './carousel-utils';

export const bulletActiveClass = 'bullet--active';

const mediaQueryS = getMediaQueryMin('s');
// the speed which "splide" framework uses to switch between slides
const splideSpeed = '0.4s';
const bulletSize = '8px';
const activeBulletWidth = '20px';
const navGap = spacingStaticXSmall;
const navBtnPadding = spacingStaticSmall;
// nav button is a square, so it's width is equal to it's height
const navBtnWidthHeight = `calc(${fontLineHeight} + ${navBtnPadding} * 2)`;
// nav width is being calculated based on icon width (fontLineHeight), button padding and distance (navGap) between 2 nav buttons
const navWidth = `calc((${navBtnWidthHeight}) * 2 + ${navGap})`;
const headerGap = spacingFluidXSmall;
// in a case alignHeader=center is being set - Heading's and Description's "spacing" (left and right) should be equal to the nav's width plus header gap
const headerAlignCenterSpacing = `${navWidth} + ${headerGap}`;

export const getComponentCss = (
  wrapContent: boolean,
  disablePagination: BreakpointCustomizable<boolean>,
  theme: Theme,
  alignHeader: HeaderAlign
): string => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  const isAlignLeft = alignHeader === 'left';

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
        }),
      }),
      'p,::slotted([slot=description])': addImportantToEachRule({
        ...textSmallStyle,
        margin: 0,
        color: primaryColor,
        maxWidth: '550px',
        ...(!isAlignLeft && {
          margin: '0 auto',
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
      gap: headerGap,
      padding: wrapContent ? `0 ${gridSafeZoneBase}` : null,
      font: textSmallStyle.font, // we need the font to be the same as nav font in order to set gridTemplateColumns correctly depending on nav width
      [mediaQueryS]: {
        ...(isAlignLeft
          ? {
              color: '#000',
              gridTemplateColumns: `minmax(0px, 1fr) ${navWidth}`, // 2nd row has width of nav buttons
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
      },
    },
    btn: {
      padding: navBtnPadding,
    },
    ...(disablePagination !== true && {
      pagination: {
        ...buildResponsiveStyles(disablePagination, (value: boolean) => ({ display: value ? 'none' : 'block' })),
        textAlign: 'center',
        lineHeight: bulletSize,
      },
      bullet: {
        display: 'inline-block',
        borderRadius: borderRadiusSmall,
        background: disabledColor,
        margin: `0 ${spacingStaticXSmall}`,
        // set transition to have the same speed as switching slides in splide
        transition: `background-color ${splideSpeed}, width ${splideSpeed}`,
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
