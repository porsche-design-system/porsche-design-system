import { fontLineHeight } from '@porsche-design-system/styles';
import { addImportantToEachRule, getDisabledBaseStyles, hostHiddenStyles } from '../../../styles';
import { getCheckboxBaseStyles } from '../../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../../styles/checkbox/checkbox-checked-base-styles';
import { getOptionJssStyle } from '../../../styles/select';
import { getCss, mergeDeep } from '../../../utils';
import { cssVarInternalCheckboxScaling } from '../../../styles/checkbox/checkbox-css-vars';

export const cssVarInternalMultiSelectOptionScaling = '--p-internal-multi-select-option-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (isDisabled: boolean, selected: boolean): string => {
  const checkboxDimension = `calc(var(${cssVarInternalCheckboxScaling}) * 1.75rem)`;
  const labelPaddingTop = `max(0px, calc((${checkboxDimension} - ${fontLineHeight}) / 2))`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...(isDisabled && getDisabledBaseStyles()),
          scrollMarginBlockStart: `calc(max(2px, var(${cssVarInternalMultiSelectOptionScaling}, 1) * 6px) + 36px)`, // 36px input height + 6px padding
          scrollMarginBlockEnd: `max(2px, var(${cssVarInternalMultiSelectOptionScaling}, 1) * 6px)`, // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
          [`${cssVarInternalCheckboxScaling}`]: `var(${cssVarInternalMultiSelectOptionScaling})`,
        }),
      },
      slot: {
        display: 'block',
        paddingTop: labelPaddingTop,
      },
    },
    option: getOptionJssStyle('multi-select-option', cssVarInternalMultiSelectOptionScaling),
    checkbox: mergeDeep(
      getCheckboxBaseStyles(isDisabled, false, 'none'),
      selected ? getCheckboxCheckedBaseStyles(false) : {}
    ),
  });
};
