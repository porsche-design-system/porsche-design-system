import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors } from '../../../styles';

const glideCss = `.glide {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}
.glide * {
  box-sizing: inherit;
}
.glide__track {
  overflow: hidden;
}
.glide__slides {
  position: relative;
  width: 100%;
  list-style: none;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  touch-action: pan-Y;
  overflow: hidden;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  will-change: transform;
}
.glide__slides--dragging {
  user-select: none;
}
.glide__slide {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  white-space: normal;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
.glide__slide a {
  user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.glide__arrows {
  -webkit-touch-callout: none;
  user-select: none;
}
.glide__bullets {
  -webkit-touch-callout: none;
  user-select: none;
}
.glide--rtl {
  direction: rtl;
}`;

export const getComponentCss = (
  _disablePagination: BreakpointCustomizable<boolean>,
  theme: ThemeExtendedElectric
): string => {
  const { brandColor, contrastLowColor } = getThemedColors(theme);

  return (
    getCss({
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
    }) + glideCss
  );
};
