import { borderRadiusSmall, fontSizeTextXSmall, textSmallStyle } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from '../../styles';
import { getCss } from '../../utils';

const { primaryColor, frostedColor, contrastHighColor } = colors;

export const cssVarInternalTagDismissibleScaling = '--p-internal-tag-dismissible-scaling';
export const getScalingVar = (compact: boolean) =>
  `var(${cssVarInternalTagDismissibleScaling}, ${compact ? 'calc(4 / 13)' : 1})`;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (hasLabel: boolean, compact: boolean): string => {
  const scalingVar = getScalingVar(compact);

  const iconPadding = '4px';
  const paddingBlock = `calc(${scalingVar} * 0.8125 * ${SCALING_BASE_VALUE} - ${iconPadding}/2)`; // 0.8125 * SCALING_BASE_VALUE corresponds to 13px
  const paddingInline = `max(calc(${scalingVar} * 0.8125 * ${SCALING_BASE_VALUE} - 1px), 4px)`;
  const gap = `max(calc(${scalingVar} * 0.75 * ${SCALING_BASE_VALUE}), 2px)`; // 0.5 * SCALING_BASE_VALUE corresponds to 12px

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
      button: {
        all: 'unset',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        gap,
        padding: `${hasLabel ? `calc(${paddingBlock} - 6px)` : paddingBlock} ${paddingInline}`,
        borderRadius: borderRadiusSmall,
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
      marginInlineEnd: '-2px', // compensate white space of svg icon and optimize visual alignment
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
