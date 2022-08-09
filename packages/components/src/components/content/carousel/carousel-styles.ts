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

const swiperPaginationCss = `
.swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 0.3s opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
}
.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}
.swiper-pagination-disabled > .swiper-pagination,
.swiper-pagination.swiper-pagination-disabled {
  display: none !important;
}
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}
.swiper-pagination-bullets-dynamic {
  overflow: hidden;
  font-size: 0;
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transform: scale(0.33);
  position: relative;
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
  transform: scale(1);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
  transform: scale(1);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
  transform: scale(0.66);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
  transform: scale(0.33);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
  transform: scale(0.66);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
  transform: scale(0.33);
}
.swiper-pagination-bullet {
  width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));
  height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));
  display: inline-block;
  border-radius: 50%;
  background: var(--swiper-pagination-bullet-inactive-color, #000);
  opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
}
button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
}
.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}
.swiper-pagination-bullet:only-child {
  display: none !important;
}
.swiper-pagination-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
}
.swiper-pagination-vertical.swiper-pagination-bullets,
.swiper-vertical > .swiper-pagination-bullets {
  right: 10px;
  top: 50%;
  transform: translate3d(0px, -50%, 0);
}
.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: var(--swiper-pagination-bullet-vertical-gap, 6px) 0;
  display: block;
}
.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
.swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
}
.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
.swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  display: inline-block;
  transition: 0.2s transform, 0.2s top;
}
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);
}
.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 0.2s transform, 0.2s left;
}
.swiper-horizontal.swiper-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 0.2s transform, 0.2s right;
}
.swiper-pagination-progressbar {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
}
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transform-origin: left top;
}
.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  transform-origin: right top;
}
.swiper-horizontal > .swiper-pagination-progressbar,
.swiper-pagination-progressbar.swiper-pagination-horizontal,
.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite,
.swiper-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
  width: 100%;
  height: 4px;
  left: 0;
  top: 0;
}
.swiper-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,
.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite,
.swiper-pagination-progressbar.swiper-pagination-vertical,
.swiper-vertical > .swiper-pagination-progressbar {
  width: 4px;
  height: 100%;
  left: 0;
  top: 0;
}
.swiper-pagination-lock {
  display: none;
}`;

export const getComponentCss = (
  _disablePagination: BreakpointCustomizable<boolean>,
  theme: ThemeExtendedElectric
): string => {
  const { brandColor } = getThemedColors(theme);

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
        '--swiper-theme-color': brandColor,
        '--swiper-navigation-size': '44px',
      },
      'swiper-pointer-events': {
        touchAction: 'pan-y',
      },
      // not working
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
    }) + swiperPaginationCss
  );
};
