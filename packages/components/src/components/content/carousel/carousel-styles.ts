import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getScreenReaderOnlyJssStyle, getThemedColors, pxToRemWithUnit } from '../../../styles';
import { headingMedium, mediaQueryMin } from '@porsche-design-system/utilities-v2';

const mediaQueryS = mediaQueryMin('s');
const mediaQueryXxl = mediaQueryMin('xxl');

export const getComponentCss = (_disablePagination: BreakpointCustomizable<boolean>, theme: Theme): string => {
  const { contrastLowColor, contrastHighColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        width: '100%',
        gap: pxToRemWithUnit(24),
        gridAutoFlow: 'row',
        [mediaQueryS]: {
          gap: pxToRemWithUnit(40),
        },
        [mediaQueryXxl]: {
          gap: pxToRemWithUnit(62),
        },
      }),
      // '::slotted(*)': addImportantToEachRule({
      //   boxSizing: 'border-box',
      // }),
      h2: {
        ...headingMedium,
        margin: `0 ${pxToRemWithUnit(8)} 0 0 `,
      },
    },
    splide: {
      position: 'relative',
      minWidth: 0,
      // visibility: 'hidden',
      '&__track': {
        position: 'relative',
        // overflow: 'hidden',
        '&--draggable': {
          userSelect: 'none',
          WebkitTouchCallout: 'none',
        },
      },
      '&__list': {
        display: 'flex',
        height: '100%',
        backfaceVisibility: 'hidden',
      },
      '&__slide': {
        position: 'relative',
        boxSizing: 'border-box',
        flexShrink: 0,
        backfaceVisibility: 'hidden',
      },
      '&__sr': getScreenReaderOnlyJssStyle(),
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
      gridTemplateColumns: 'auto 0 0',
      [mediaQueryS]: {
        gridTemplateColumns: 'auto min-content min-content',
        alignItems: 'end',
        gap: pxToRemWithUnit(8),
      },
    },
    btn: {
      visibility: 'hidden',
      height: 0,
      [mediaQueryS]: {
        visibility: 'visible',
        height: 'auto',
      },
      '&:first-of-type': {
        gridColumn: 2,
      },
    },
    pagination: {
      display: 'grid',
      gridAutoColumns: '8px',
      gridAutoFlow: 'column',
      justifyContent: 'center',
      gap: '8px',
      height: '8px',
    },
    bullet: {
      borderRadius: '4px',
      background: contrastLowColor,
      '&--active': {
        background: contrastHighColor,
      },
    },
  });
};
