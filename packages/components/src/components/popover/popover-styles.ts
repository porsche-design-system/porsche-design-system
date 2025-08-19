import {
  borderRadiusSmall,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  frostedGlassStyle,
  motionDurationShort,
  motionEasingBase,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableAnimationDuration,
  getFocusJssStyle,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { Theme } from '../../types';
import { getCss, isHighContrastMode, isThemeDark } from '../../utils';
import { POPOVER_SAFE_ZONE } from './popover-utils';

const { canvasTextColor } = getHighContrastColors();

export const getComponentCss = (theme: Theme): string => {
  const { hoverColor, backgroundColor, primaryColor, backgroundSurfaceColor } = getThemedColors(theme);
  const {
    hoverColor: hoverColorDark,
    primaryColor: primaryColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
  } = getThemedColors('dark');

  const shadowColor = 'rgba(0,0,0,0.3)';

  return getCss({
    '@global': {
      '@keyframes fade-in': {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
      ':host': {
        position: 'relative', // ensures correct reference for floating ui fallback positioning in older browsers
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      'slot[name="button"]': {
        display: 'block',
      },
      ...preventFoucOfNestedElementsStyles,
      p: {
        ...textSmallStyle,
        margin: 0,
      },
      button: {
        all: 'unset',
        display: 'block',
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width/height definition based on ex-unit
        width: fontLineHeight, // width needed to improve ssr support
        height: fontLineHeight, // height needed to improve ssr support
        borderRadius: '50%',
        cursor: 'pointer',
        ...hoverMediaQuery({
          transition: getTransition('background-color'),
          '&:hover': {
            ...frostedGlassStyle,
            backgroundColor: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: hoverColorDark,
            }),
          },
        }),
        ...getFocusJssStyle(theme, { offset: 0 }),
      },
      '[popover]': {
        all: 'unset',
        position: 'absolute',
        pointerEvents: 'none',
        filter: `drop-shadow(0 0 16px ${shadowColor})`,
        backdropFilter: 'drop-shadow(0 0 transparent)', // workaround for Firefox bug not rendering PDS frosted glass correctly when nested inside CSS filter: https://bugzilla.mozilla.org/show_bug.cgi?id=1797051
        animation: `var(${cssVariableAnimationDuration}, ${motionDurationShort}) fade-in ${motionEasingBase} forwards`,
        '&:not(:popover-open)': {
          display: 'none', // ensures popover is not flickering when closed in some situations
        },
      },
    },
    label: getHiddenTextJssStyle(),
    icon: {
      transform: 'translate3d(0,0,0)', // Fixes movement on hover in Safari
    },
    arrow: {
      position: 'absolute',
      width: '24px',
      height: '12px',
      clipPath: 'polygon(50% 0, 100% 110%, 0 110%)',
      ...(isHighContrastMode
        ? {
            background: canvasTextColor,
          }
        : {
            background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: backgroundSurfaceColorDark,
            }),
          }),
    },
    content: {
      maxWidth: `min(calc(100dvw - ${POPOVER_SAFE_ZONE * 2}px), 48ch)`,
      width: 'max-content', // ensures in older browsers correct width
      boxSizing: 'border-box',
      padding: `${spacingStaticSmall} ${spacingStaticMedium}`,
      pointerEvents: 'auto',
      borderRadius: borderRadiusSmall,
      ...(isHighContrastMode && {
        outline: `1px solid ${canvasTextColor}`,
      }),
      ...textSmallStyle,
      background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
      color: primaryColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: backgroundSurfaceColorDark,
        color: primaryColorDark,
      }),
    },
  });
};
