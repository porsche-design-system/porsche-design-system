import { fontSizeTextXSmall, textSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colors,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { legacyRadiusSmall, radiusFull, radiusLg, radiusXl } from '../../styles/css-variables';
import { getCss } from '../../utils';

const { primaryColor, frostedColor, contrastHighColor } = colors;

export const cssVarInternalTagDismissibleScaling = '--p-internal-tag-dismissible-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (hasLabel: boolean, isCompact: boolean): string => {
  const buttonPaddingBlock = hasLabel
    ? `calc(16.8px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714))`
    : `calc(28px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714) + 6px)`;
  const buttonPaddingInline = `calc(22.4px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714) + 4px)`;
  const buttonGap = `calc(22.4px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714) + 4px)`;
  const iconPadding = `calc(11.2px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714))`;
  const iconMargin = `calc(-1 * ${iconPadding})`;

  return getCss({
    '@global': {
      ':host': {
        [`${cssVarInternalTagDismissibleScaling}`]: isCompact ? 0.64285714 : 1,
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        all: 'unset',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        gap: buttonGap,
        padding: `${buttonPaddingBlock} ${buttonPaddingInline}`,
        borderRadius: `var(${legacyRadiusSmall}, ${isCompact ? radiusLg : radiusXl})`,
        cursor: 'pointer',
        background: frostedColor,
        color: primaryColor,
        textAlign: 'start',
        ...textSmallStyle,
        ...hoverMediaQuery({
          '&:hover > .icon': {
            backgroundColor: frostedColor,
          },
        }),
        '&:focus-visible': getFocusBaseStyles(),
      },
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: '-4px',
        color: contrastHighColor,
        fontSize: fontSizeTextXSmall,
      },
    }),
    icon: {
      padding: iconPadding,
      margin: iconMargin,
      transition: getTransition('background-color'),
      borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
