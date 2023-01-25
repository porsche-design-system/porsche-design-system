import type { PopoverDirection } from './popover-utils';
import type { JssStyle } from 'jss';
import {
  borderRadiusLarge,
  borderRadiusSmall,
  borderWidthBase,
  frostedGlassStyle,
  getMediaQueryMin,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import { addImportantToEachRule, getTextHiddenJssStyle, getThemedColors, getTransition } from '../../styles';
import { POPOVER_Z_INDEX } from '../../constants';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import type { Theme } from '../../utils/theme';

const { backgroundColor: backgroundColorThemeLight, primaryColor: primaryColorThemeLight } = getThemedColors('light');

const mediaQueryXS = getMediaQueryMin('xs');
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
          // Needs to stay in rem for up-scaling
          width: '1.5rem', // width of icon (to improve ssr support)
          height: '1.5rem', // height of icon (to improve ssr support)
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
        appearance: 'none',
        background: 'transparent',
        border: 0,
        padding: 0,
        cursor: 'pointer',
        borderRadius: borderRadiusLarge,
        transition: getTransition('background-color'),
        ...hoverMediaQuery({
          '&:hover': {
            ...frostedGlassStyle,
            backgroundColor: hoverColor,
          },
        }),
        '&:focus': {
          outline: `${focusColor} ${borderWidthBase} solid`,
        },
        '&:not(:focus-visible)': {
          outlineColor: 'transparent',
        },
      },
    },
    label: getTextHiddenJssStyle(true),
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
      background: backgroundColorThemeLight,
      padding: '8px 16px',
      pointerEvents: 'auto',
      ...directionPositionMap[direction],
      ...textSmallStyle,
      listStyleType: 'none',
      color: primaryColorThemeLight,
      whiteSpace: 'inherit',
      borderRadius: borderRadiusSmall,
      [mediaQueryXS]: {
        maxWidth: '432px',
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
