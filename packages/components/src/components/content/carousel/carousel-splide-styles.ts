import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors } from '../../../styles';

const splideCss = `
.splide {
  position: relative;
  visibility: hidden;
}
.splide__track {
  overflow: hidden;
  position: relative;
  z-index: 0;
}
.splide__track--draggable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
.splide__sr {
  clip: rect(0 0 0 0);
  border: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
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
