import {
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
  colors,
  cssVariableAnimationDuration,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { legacyRadiusSmall, radiusFull, radiusLg } from '../../styles/css-variables';
import { getCss } from '../../utils';
import { POPOVER_SAFE_ZONE } from './popover-utils';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (): string => {
  const { frostedSoftColor, frostedColor, canvasColor, primaryColor } = colors;

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
        borderRadius: radiusFull,
        cursor: 'pointer',
        backgroundColor: frostedColor,
        transition: getTransition('background-color'),
        ...frostedGlassStyle,
        ...hoverMediaQuery({
          '&:hover': {
            backgroundColor: frostedSoftColor,
          },
        }),
        '&:focus-visible': getFocusBaseStyles(),
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
      background: canvasColor,
    },
    content: {
      maxWidth: `min(calc(100dvw - ${POPOVER_SAFE_ZONE * 2}px), 48ch)`,
      width: 'max-content', // ensures in older browsers correct width
      boxSizing: 'border-box',
      padding: `${spacingStaticSmall} ${spacingStaticMedium}`,
      pointerEvents: 'auto',
      borderRadius: `var(${legacyRadiusSmall}, ${radiusLg})`,
      ...textSmallStyle,
      background: canvasColor,
      color: primaryColor,
    },
  });
};
