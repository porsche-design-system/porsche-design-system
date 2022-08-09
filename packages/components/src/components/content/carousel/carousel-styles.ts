import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors } from '../../../styles';

// const swiperCss = `
// .swiper-css-mode > .swiper-wrapper {
//   overflow: auto;
//   scrollbar-width: none;
//   -ms-overflow-style: none;
// }
// .swiper-css-mode > .swiper-wrapper::-webkit-scrollbar {
//   display: none;
// }
// .swiper-css-mode > .swiper-wrapper > .swiper-slide {
//   scroll-snap-align: start start;
// }
// .swiper-horizontal.swiper-css-mode > .swiper-wrapper {
//   scroll-snap-type: x mandatory;
// }`;

const splideCss = `@keyframes splide-loading {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
.splide__track--draggable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.splide__track--fade > .splide__list {
  display: block;
}
.splide__track--fade > .splide__list > .splide__slide {
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 0;
}
.splide__track--fade > .splide__list > .splide__slide.is-active {
  opacity: 1;
  position: relative;
  z-index: 1;
}
.splide--rtl {
  direction: rtl;
}
.splide__track--ttb > .splide__list {
  display: block;
}
.splide__container {
  box-sizing: border-box;
  position: relative;
}
.splide__list {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
}
.splide.is-initialized:not(.is-active) .splide__list {
  display: block;
}
.splide__pagination {
  -ms-flex-align: center;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0;
  pointer-events: none;
}
.splide__pagination li {
  display: inline-block;
  line-height: 1;
  list-style-type: none;
  margin: 0;
  pointer-events: auto;
}
.splide__progress__bar {
  width: 0;
}
.splide {
  position: relative;
  visibility: hidden;
}
.splide.is-initialized,
.splide.is-rendered {
  visibility: visible;
}
.splide__slide {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-sizing: border-box;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  list-style-type: none !important;
  margin: 0;
  position: relative;
}
.splide__slide img {
  vertical-align: bottom;
}
.splide__spinner {
  animation: splide-loading 1s linear infinite;
  border: 2px solid #999;
  border-left-color: transparent;
  border-radius: 50%;
  bottom: 0;
  contain: strict;
  display: inline-block;
  height: 20px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
}
.splide__sr {
  clip: rect(0 0 0 0);
  border: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.splide__toggle.is-active .splide__toggle__play,
.splide__toggle__pause {
  display: none;
}
.splide__toggle.is-active .splide__toggle__pause {
  display: inline;
}
.splide__track {
  overflow: hidden;
  position: relative;
  z-index: 0;
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
    }) + splideCss
  );
};
