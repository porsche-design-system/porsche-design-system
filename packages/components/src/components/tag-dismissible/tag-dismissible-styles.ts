import { borderRadiusSmall, fontSizeTextXSmall, textSmallStyle } from '@porsche-design-system/styles';
import { spacingStaticXs } from '@porsche-design-system/tokens';
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
} from '../../styles';
import { getCss } from '../../utils';

const { primaryColor, frostedColor, contrastHighColor } = colors;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (hasLabel: boolean): string => {
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
        gap: '12px',
        minHeight: '54px',
        padding: '4px 12px',
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
      padding: spacingStaticXs,
      marginInlineEnd: '-2px', // compensate white space of svg icon and optimize visual alignment
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
