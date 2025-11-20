import { borderRadiusSmall, fontSizeTextXSmall, textSmallStyle } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from '../../styles';
import type { Theme } from '../../types';
import { getCss, isHighContrastMode } from '../../utils';
import { getThemedBackgroundColor } from '../tag/tag-shared-utils';
import type { TagDismissibleColor, TagDismissibleColorDeprecated } from './tag-dismissible-utils';

export const cssVarInternalTagDismissibleScaling = '--p-internal-tag-dismissible-scaling';
export const getScalingVar = (compact: boolean) =>
  `var(${cssVarInternalTagDismissibleScaling}, ${compact ? 'calc(4 / 13)' : 1})`;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  color: Exclude<TagDismissibleColor, TagDismissibleColorDeprecated>,
  hasLabel: boolean,
  compact: boolean,
  theme: Theme
): string => {
  const scalingVar = getScalingVar(compact);

  const iconPadding = '4px';
  const paddingBlock = `calc(${scalingVar} * 0.8125 * ${SCALING_BASE_VALUE} - ${iconPadding}/2)`; // 0.8125 * SCALING_BASE_VALUE corresponds to 13px
  const paddingInline = `max(calc(${scalingVar} * 0.8125 * ${SCALING_BASE_VALUE} - 1px), 4px)`;
  const gap = `max(calc(${scalingVar} * 0.75 * ${SCALING_BASE_VALUE}), 2px)`; // 0.5 * SCALING_BASE_VALUE corresponds to 12px

  const themedColors = getThemedColors(theme);
  const themedColorsDark = getThemedColors('dark');
  const { primaryColor, hoverColor, contrastHighColor } = themedColors;
  const {
    primaryColor: primaryColorDark,
    hoverColor: hoverColorDark,
    contrastHighColor: contrastHighColorDark,
  } = themedColorsDark;
  const backgroundColor = getThemedBackgroundColor(color, themedColors);
  const backgroundColorDark = getThemedBackgroundColor(color, themedColorsDark);

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          outline: 0,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        gap,
        padding: `${hasLabel ? `calc(${paddingBlock} - 6px)` : paddingBlock} ${paddingInline}`,
        margin: 0, // Removes default button margin on safari 15
        borderRadius: borderRadiusSmall,
        border: 0,
        cursor: 'pointer',
        background: backgroundColor,
        color: primaryColor,
        textAlign: 'start',
        ...textSmallStyle,
        ...(isHighContrastMode && {
          // TODO: using border would increase the dimension but using outline interferes with the focus style
          outline: '1px solid transparent',
        }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
          color: primaryColorDark,
        }),
        ...hoverMediaQuery({
          '&:hover > .icon': {
            backgroundColor: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: hoverColorDark,
            }),
          },
        }),
        ...getFocusJssStyle(theme),
      },
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: '-4px',
        color: contrastHighColor,
        fontSize: fontSizeTextXSmall,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: contrastHighColorDark,
        }),
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
