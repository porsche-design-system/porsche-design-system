import {
  borderRadiusSmall,
  fontLineHeight,
  frostedGlassStyle,
  motionDurationShort,
  motionEasingBase,
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
import { getPopoverResetJssStyle } from '../../styles/popover-reset-styles';
import type { Theme } from '../../types';
import { getCss, isHighContrastMode, isThemeDark } from '../../utils';

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
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      p: {
        ...textSmallStyle,
        margin: 0,
      },
      button: {
        display: 'block',
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        background: 'transparent',
        border: 0,
        padding: 0,
        cursor: 'pointer',
        ...textSmallStyle,
        width: fontLineHeight, // width needed to improve ssr support
        height: fontLineHeight, // height needed to improve ssr support
        borderRadius: '50%',
        // TODO: we should try to use getHoverStyle()
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
    },
    label: getHiddenTextJssStyle(),
    icon: {
      transform: 'translate3d(0,0,0)', // Fixes movement on hover in Safari
    },
    popover: {
      ...getPopoverResetJssStyle(),
      '&[popover]:is(:popover-open)': {
        display: 'flex',
      },
      flexDirection: 'column',
      inset: 0,
      width: 'max-content',
      filter: `drop-shadow(0 0 16px ${shadowColor})`,
      pointerEvents: 'none',
      animation:
        ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
          ? `${motionDurationShort} $fadeIn ${motionEasingBase} forwards`
          : `var(${cssVariableAnimationDuration}, ${motionDurationShort}) $fadeIn ${motionEasingBase} forwards`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        filter: `drop-shadow(0 0 16px ${shadowColor})`,
      }),
    },
    arrow: {
      alignSelf: 'center',
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
      maxWidth: 'min(90vw, 48ch)',
      width: 'max-content',
      height: 'max-content',
      boxSizing: 'border-box',
      background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
      padding: '8px 16px',
      pointerEvents: 'auto',
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
