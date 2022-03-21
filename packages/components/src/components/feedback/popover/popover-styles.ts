import type { PopoverDirection } from './popover-utils';
import type { JssStyle } from 'jss';
import { mediaQueryMin, textSmall } from '@porsche-design-system/utilities-v2';
import { buildSlottedStyles, getCss } from '../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, getThemedColors, pxToRemWithUnit } from '../../../styles';
import { POPOVER_Z_INDEX } from '../../../constants';

const { backgroundColor, baseColor } = getThemedColors('light');

const mediaQueryXS = mediaQueryMin('xs');
const mediaQueryForcedColors = '@media (forced-colors: active)';

const directionPositionMap: { [key in PopoverDirection]: JssStyle } = {
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  right: {
    top: '50%',
    left: '100%',
    transform: 'translateY(-50%)',
  },
  bottom: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    top: '50%',
    right: '100%',
    transform: 'translateY(-50%)',
  },
};

const borderWidth = '.75rem';
const transparentColor = 'transparent';
const canvas = 'canvas';
const canvasText = 'canvastext';
const join = (...arr: (string | number)[]): string => arr.join(' ');

const directionArrowMap: { [key in PopoverDirection]: JssStyle } = {
  top: {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: join(borderWidth, borderWidth, 0),
    borderColor: join(backgroundColor, transparentColor, transparentColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvasText, canvas, canvas),
    },
  },
  right: {
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    borderWidth: join(borderWidth, borderWidth, borderWidth, 0),
    borderColor: join(transparentColor, backgroundColor, transparentColor, transparentColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvasText, canvas, canvas),
    },
  },
  bottom: {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: join(0, borderWidth, borderWidth),
    borderColor: join(transparentColor, transparentColor, backgroundColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvas, canvasText),
    },
  },
  left: {
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    borderWidth: join(borderWidth, 0, borderWidth, borderWidth),
    borderColor: join(transparentColor, transparentColor, transparentColor, backgroundColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvas, canvas, canvasText),
    },
  },
};

export const getComponentCss = (direction: PopoverDirection): string => {
  const spacerBox = '-1rem';

  return getCss({
    '@global': {
      ':host': {
        verticalAlign: 'top',
        ...addImportantToEachRule({
          position: 'relative',
          display: 'inline-block',
        }),
      },
    },
    spacer: {
      position: 'absolute',
      zIndex: POPOVER_Z_INDEX,
      top: spacerBox,
      left: spacerBox,
      right: spacerBox,
      bottom: spacerBox,
      filter: 'drop-shadow(0 0 1rem rgba(0,0,0,.3))',
      pointerEvents: 'none',
      animation:
        ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
          ? '240ms $fadeIn ease forwards'
          : 'var(--p-override-popover-animation-duration, 240ms) $fadeIn ease forwards',
      '&::before': {
        content: '""',
        position: 'absolute',
        borderStyle: 'solid',
        ...directionArrowMap[direction],
      },
    },
    popover: {
      position: 'absolute',
      maxWidth: '90vw',
      width: 'max-content',
      boxSizing: 'border-box',
      background: backgroundColor,
      padding: '.5rem 1rem',
      pointerEvents: 'auto',
      ...directionPositionMap[direction],
      ...textSmall,
      WebkitTextSizeAdjust: 'none',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      listStyleType: 'none',
      // TODO: The styles above are our text styles should be extracted as soon as p-text is refactored with JSS
      color: baseColor,
      whiteSpace: 'inherit',
      [mediaQueryXS]: {
        maxWidth: pxToRemWithUnit(432),
      },
      [mediaQueryForcedColors]: {
        outline: `1px solid ${canvasText}`,
      },
    },
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
