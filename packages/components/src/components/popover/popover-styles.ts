import type { PopoverDirection } from './popover-utils';
import type { JssStyle } from 'jss';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  frostedGlassStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getTextHiddenJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { POPOVER_Z_INDEX } from '../../constants';
import type { Theme } from '../../types';

const { backgroundColor: backgroundColorThemeLight, primaryColor: primaryColorThemeLight } = getThemedColors('light');

const mediaQueryForcedColors = '@media (forced-colors: active)';

const directionPositionMap: { [key in PopoverDirection]: JssStyle } = {
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)', // translate3d used to fix Safari shadow bug
  },
  right: {
    top: '50%',
    left: '100%',
    transform: 'translate3d(0, -50%, 0)',
  },
  bottom: {
    top: '100%',
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)',
  },
  left: {
    top: '50%',
    right: '100%',
    transform: 'translate3d(0, -50%, 0)',
  },
};

const borderWidth = '12px';
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
    borderColor: join(backgroundColorThemeLight, transparentColor, transparentColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvasText, canvas, canvas),
    },
  },
  right: {
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    borderWidth: join(borderWidth, borderWidth, borderWidth, 0),
    borderColor: join(transparentColor, backgroundColorThemeLight, transparentColor, transparentColor),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvasText, canvas, canvas),
    },
  },
  bottom: {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: join(0, borderWidth, borderWidth),
    borderColor: join(transparentColor, transparentColor, backgroundColorThemeLight),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvas, canvasText),
    },
  },
  left: {
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    borderWidth: join(borderWidth, 0, borderWidth, borderWidth),
    borderColor: join(transparentColor, transparentColor, transparentColor, backgroundColorThemeLight),
    [mediaQueryForcedColors]: {
      borderColor: join(canvas, canvas, canvas, canvasText),
    },
  },
};

export const getComponentCss = (direction: PopoverDirection, theme: Theme): string => {
  const spacerBox = '-16px';
  const { hoverColor, focusColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          position: 'relative',
          display: 'inline-block',
          ...hostHiddenStyles,
        }),
        verticalAlign: 'top',
      },
      p: {
        ...textSmallStyle,
        margin: 0,
      },
      button: {
        display: 'block',
        position: 'relative',
        appearance: 'none',
        background: 'transparent',
        border: 0,
        padding: 0,
        outline: 0,
        cursor: 'pointer',
        ...textSmallStyle,
        width: fontLineHeight, // width needed to improve ssr support
        height: fontLineHeight, // height needed to improve ssr support
        borderRadius: '50%',
        transition: getTransition('background-color'),
        ...hoverMediaQuery({
          '&:hover': {
            ...frostedGlassStyle,
            backgroundColor: hoverColor,
          },
        }),
        '&::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-2),
          border: `${borderWidthBase} solid transparent`,
          borderRadius: '50%',
        },
        '&:focus::before': {
          borderColor: focusColor,
        },
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
      },
    },
    label: getTextHiddenJssStyle(true),
    icon: {
      display: 'inline-block', // TODO: should be changed in icon!
      transform: 'translate3d(0,0,0)', // Fixes movement on hover in Safari
    },
    spacer: {
      position: 'absolute',
      zIndex: POPOVER_Z_INDEX,
      top: spacerBox,
      left: spacerBox,
      right: spacerBox,
      bottom: spacerBox,
      filter: 'drop-shadow(0 0 16px rgba(0,0,0,.3))',
      backdropFilter: 'drop-shadow(0px 0px 0px transparent)', // fixes issues with Chrome >= 105 where filter: drop-shadow is not applied correctly after animation ends
      pointerEvents: 'none',
      animation:
        ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
          ? '240ms $fadeIn ease forwards'
          : 'var(--p-animation-duration, 240ms) $fadeIn ease forwards',
      '&::before': {
        content: '""',
        position: 'absolute',
        borderStyle: 'solid',
        ...directionArrowMap[direction],
      },
    },
    popover: {
      position: 'absolute',
      maxWidth: 'min(90vw, 27rem)',
      width: 'max-content',
      boxSizing: 'border-box',
      background: backgroundColorThemeLight,
      padding: '8px 16px',
      pointerEvents: 'auto',
      ...directionPositionMap[direction],
      ...textSmallStyle,
      listStyleType: 'none',
      color: primaryColorThemeLight,
      whiteSpace: 'inherit',
      borderRadius: borderRadiusSmall,
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
