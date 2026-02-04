import { fontFamily, fontLineHeight, fontSizeTextSmall } from '@porsche-design-system/styles';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { cssVarInternalCheckboxScaling, getCheckboxBaseStyles } from '../../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../../styles/checkbox/checkbox-checked-base-styles';
import { getOptionJssStyle } from '../../../styles/select';
import type { Theme } from '../../../types';
import { getCss } from '../../../utils';

export const cssVarInternalMultiSelectOptionScaling = '--p-internal-multi-select-option-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (theme: Theme, isDisabled: boolean, selected: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          scrollMarginBlockStart: `calc(max(2px, var(${cssVarInternalMultiSelectOptionScaling}, 1) * 6px) + 36px)`, // 36px input height + 6px padding
          scrollMarginBlockEnd: `max(2px, var(${cssVarInternalMultiSelectOptionScaling}, 1) * 6px)`, // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
          [`${cssVarInternalCheckboxScaling}`]: `var(${cssVarInternalMultiSelectOptionScaling})`,
        }),
      },
    },
    option: getOptionJssStyle('multi-select-option', `var(${cssVarInternalMultiSelectOptionScaling}, 1)`, theme),
    'checkbox-wrapper': {
      fontFamily: fontFamily,
      fontSize: fontSizeTextSmall,
      height: fontLineHeight,
      display: 'flex',
      alignItems: 'center',
    },
    checkbox: {
      flexShrink: 0,
      ...getCheckboxBaseStyles(theme, isDisabled),
      ...(selected && getCheckboxCheckedBaseStyles(theme, isDisabled)),
    },
  });
};
