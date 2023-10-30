import type { PopoverDirection } from './popover-utils';
import type { JssStyle } from 'jss';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  frostedGlassStyle,
  motionDurationShort,
  motionEasingBase,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getCss, isHighContrastMode, isThemeDark } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableAnimationDuration,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { POPOVER_Z_INDEX } from '../../constants';
import type { Theme } from '../../types';
import { safeZonePx } from './popover-utils';

const { canvasColor, canvasTextColor } = getHighContrastColors();

const directionPositionMap: Record<PopoverDirection, JssStyle> = {
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

const join = (...arr: (string | number)[]): string => arr.join(' ');

const getDirectionArrowMap = (theme: Theme): Record<PopoverDirection, JssStyle> => {
  const { backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const { backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');
  const isDark = isThemeDark(theme);
  return {
    top: {
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      borderWidth: join(borderWidth, borderWidth, 0),
      ...(isHighContrastMode
        ? {
            borderColor: join(canvasTextColor, canvasColor, canvasColor),
          }
        : {
            borderColor: join(isDark ? backgroundSurfaceColor : backgroundColor, transparentColor, transparentColor),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: join(backgroundSurfaceColorDark, transparentColor, transparentColor),
            }),
          }),
    },
    right: {
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      borderWidth: join(borderWidth, borderWidth, borderWidth, 0),
      ...(isHighContrastMode
        ? {
            borderColor: join(canvasColor, canvasTextColor, canvasColor, canvasColor),
          }
        : {
            borderColor: join(
              transparentColor,
              isDark ? backgroundSurfaceColor : backgroundColor,
              transparentColor,
              transparentColor
            ),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: join(transparentColor, backgroundSurfaceColorDark, transparentColor, transparentColor),
            }),
          }),
    },
    bottom: {
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      borderWidth: join(0, borderWidth, borderWidth),
      ...(isHighContrastMode
        ? {
            borderColor: join(canvasColor, canvasColor, canvasTextColor),
          }
        : {
            borderColor: join(transparentColor, transparentColor, isDark ? backgroundSurfaceColor : backgroundColor),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: join(transparentColor, transparentColor, backgroundSurfaceColorDark),
            }),
          }),
    },
    left: {
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      borderWidth: join(borderWidth, 0, borderWidth, borderWidth),
      ...(isHighContrastMode
        ? {
            borderColor: join(canvasColor, canvasColor, canvasColor, canvasTextColor),
          }
        : {
            borderColor: join(
              transparentColor,
              transparentColor,
              transparentColor,
              isDark ? backgroundSurfaceColor : backgroundColor
            ),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: join(transparentColor, transparentColor, transparentColor, backgroundSurfaceColorDark),
            }),
          }),
    },
  };
};

export const getComponentCss = (direction: PopoverDirection, isNative: boolean, theme: Theme): string => {
  const { hoverColor, focusColor, backgroundColor, primaryColor, backgroundSurfaceColor } = getThemedColors(theme);
  const {
    hoverColor: hoverColorDark,
    focusColor: focusColorDark,
    primaryColor: primaryColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
  } = getThemedColors('dark');

  const shadowColor = 'rgba(0,0,0,0.3)';

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          position: 'relative',
          display: 'inline-block',
          ...colorSchemeStyles,
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
        ...hoverMediaQuery({
          transition: getTransition('background-color', 'short', 'base'),
          '&:hover': {
            ...frostedGlassStyle,
            backgroundColor: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: hoverColorDark,
            }),
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
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: focusColorDark,
          }),
        },
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
      },
    },
    label: getHiddenTextJssStyle(),
    icon: {
      display: 'inline-block', // TODO: should be changed in icon!
      transform: 'translate3d(0,0,0)', // Fixes movement on hover in Safari
    },
    spacer: {
      ...(isNative
        ? {
            overflow: 'initial',
            backgroundColor: 'transparent',
            border: 'none',
            margin: 0,
            padding: 0,
          }
        : getInsetJssStyle(-safeZonePx)),
      position: 'absolute',
      zIndex: POPOVER_Z_INDEX,
      filter: `drop-shadow(0 0 16px ${shadowColor})`,
      backdropFilter: 'drop-shadow(0px 0px 0px transparent)', // fixes issues with Chrome >= 105 where filter: drop-shadow is not applied correctly after animation ends
      pointerEvents: 'none',
      animation:
        ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
          ? `${motionDurationShort} $fadeIn ${motionEasingBase} forwards`
          : `var(${cssVariableAnimationDuration}, ${motionDurationShort}) $fadeIn ${motionEasingBase} forwards`,
      '&::before': {
        content: '""',
        position: 'absolute',
        borderStyle: 'solid',
        ...getDirectionArrowMap(theme)[direction],
      },
      ...prefersColorSchemeDarkMediaQuery(theme, {
        filter: `drop-shadow(0 0 16px ${shadowColor})`,
      }),
    },
    popover: {
      position: 'absolute',
      maxWidth: 'min(90vw, 27rem)',
      width: 'max-content',
      boxSizing: 'border-box',
      background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
      padding: '8px 16px',
      pointerEvents: 'auto',
      ...directionPositionMap[direction],
      ...textSmallStyle,
      listStyleType: 'none',
      color: primaryColor,
      whiteSpace: 'inherit',
      borderRadius: borderRadiusSmall,
      ...(isHighContrastMode && {
        outline: `1px solid ${canvasTextColor}`,
      }),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: backgroundSurfaceColorDark,
        color: primaryColorDark,
      }),
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
