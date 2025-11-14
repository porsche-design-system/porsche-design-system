import { borderRadiusSmall, fontSizeTextXSmall, textSmallStyle } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getFocusJssStyle,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getCss } from '../../utils';

const { primaryColor, frostedColor, contrastHighColor } = colors;

export const getComponentCss = (hasLabel: boolean): string => {
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
        gap: '12px',
        minHeight: '54px',
        padding: '4px 12px',
        margin: 0, // Removes default button margin on safari 15
        borderRadius: borderRadiusSmall,
        border: 0,
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
        ...getFocusJssStyle(),
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
      padding: '4px',
      marginInlineEnd: '-2px', // compensate white space of svg icon and optimize visual alignment
      transition: getTransition('background-color'),
      borderRadius: borderRadiusSmall,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
