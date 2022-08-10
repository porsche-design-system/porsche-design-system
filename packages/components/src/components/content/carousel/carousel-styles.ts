import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getScreenReaderOnlyJssStyle, getThemedColors } from '../../../styles';

export const getComponentCss = (
  _disablePagination: BreakpointCustomizable<boolean>,
  theme: ThemeExtendedElectric
): string => {
  const { brandColor, contrastLowColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted(*)': addImportantToEachRule({
        // position: 'relative',
        // width: '100%',
        // height: '100%',
        // flexShrink: 0,
        // transitionProperty: 'transform',
        // boxSizing: 'border-box',
      }),
    },
    splide: {
      position: 'relative',
      // visibility: 'hidden',
      '&__track': {
        overflow: 'hidden',
        position: 'relative',
        zIndex: 0,
        '&--draggable': {
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          // -ms-user-select: 'none',
          userSelect: 'none',
        },
      },
      '&__list': {
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        // display: -ms-flexbox,
        display: 'flex',
        height: '100%',
        margin: 0,
        padding: 0,
      },
      '&__slide': {
        position: 'relative',
        boxSizing: 'border-box',
        // -ms-flex-negative: 0,
        flexShrink: 0,
        margin: 0,
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      },
      // '&__slide img' {
      //     vertical-align: bottom,
      //   }
      '&__sr': getScreenReaderOnlyJssStyle(),
    },
    // .splide.is-initialized,
    // .splide.is-rendered {
    //     visibility: visible,
    //   }
    // .splide.is-initialized:not(.is-active) .splide__list {
    //     display: block,
    //   }
    btn: {
      position: 'absolute',
      top: '50%',
      transform: 'translate3d(0,-50%,0)',
      '&--prev': {
        left: 0,
      },
      '&--next': {
        right: 0,
      },
    },
    pagination: {
      display: 'grid',
      gridAutoColumns: '7px',
      gridAutoFlow: 'column',
      position: 'absolute',
      gap: '3px',
      height: '7px',
      bottom: 0,
      left: '50%',
      transform: 'translate3d(-50%,0,0)',
    },
    bullet: {
      borderRadius: '50%',
      background: contrastLowColor,
      '&--active': {
        background: brandColor,
      },
    },
  });
};
