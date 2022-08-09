import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors } from '../../../styles';

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
    swiper: {
      height: 'inherit',
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
      overflow: 'hidden',
      listStyle: 'none',
      padding: 'px',
      // zIndex: 1,
    },
    'swiper-pointer-events': {
      touchAction: 'pan-y',
    },
    // TODO: make this work
    'swiper-backface-hidden .swiper-slide': {
      transform: 'translateZ(0)',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
    },
    'swiper-wrapper': {
      position: 'relative',
      width: '100%',
      height: '100%',
      // zIndex: 1,
      display: 'flex',
      transform: 'translate3d(0,0,0)',
      transitionProperty: 'transform',
      boxSizing: 'content-box',
    },
    'swiper-slide': {
      position: 'relative',
      width: '100%',
      height: '100%',
      flexShrink: 0,
      transform: 'translate3d(0px, 0, 0)',
      transitionProperty: 'transform',
    },
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
