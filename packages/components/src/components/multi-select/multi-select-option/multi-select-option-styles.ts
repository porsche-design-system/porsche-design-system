import { addImportantToEachRule, getDisabledBaseStyles, hostHiddenStyles } from '../../../styles';
import { cssVarInternalCheckboxScaling, getCheckboxBaseStyles } from '../../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../../styles/checkbox/checkbox-checked-base-styles';
import { getOptionJssStyle } from '../../../styles/select';
import { getCss, mergeDeep } from '../../../utils';

export const cssVarInternalMultiSelectOptionScaling = '--p-internal-multi-select-option-scaling';

export const getComponentCss = (isDisabled: boolean, selected: boolean): string => {
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
      },
    },
    option: getOptionJssStyle('multi-select-option', `var(${cssVarInternalMultiSelectOptionScaling}, 1)`),
    checkbox: mergeDeep(
      getCheckboxBaseStyles(isDisabled, false, 'none'),
      selected ? getCheckboxCheckedBaseStyles(false) : {}
    ),
  });
};
