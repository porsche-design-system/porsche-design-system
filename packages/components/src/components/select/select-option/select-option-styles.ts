import {
  addImportantToEachRule,
  getDisabledBaseStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getButtonImageJssStyle, getOptionJssStyle } from '../../../styles/select';
import { getCss } from '../../../utils';

export const cssVarInternalSelectOptionScaling = '--p-internal-select-option-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (isDisabled: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule({
        ':host': {
          ...(isDisabled && getDisabledBaseStyles()),
          scrollMarginBlockStart: `calc(max(2px, var(${cssVarInternalSelectOptionScaling}, 1) * 6px) + 36px)`, // 36px input height + 6px padding
          scrollMarginBlockEnd: `max(2px, var(${cssVarInternalSelectOptionScaling}, 1) * 6px)`, // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
        },
        '::slotted(img)': getButtonImageJssStyle,
      }),
      ...preventFoucOfNestedElementsStyles,
    },
    option: getOptionJssStyle('select-option', cssVarInternalSelectOptionScaling),
    icon: {
      marginInlineStart: 'auto',
    },
  });
};
