import { leadingNormal, ref } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, getDisabledBaseStyles, hostHiddenStyles } from '../../../styles';
import { getCheckboxBaseStyles } from '../../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../../styles/checkbox/checkbox-checked-base-styles';
import { cssVarInternalCheckboxScaling } from '../../../styles/checkbox/checkbox-css-vars';
import { getOptionJssStyle } from '../../../styles/select';
import { getCss, mergeDeep } from '../../../utils';

export const cssVarInternalMultiSelectOptionScaling = '--_p-multi-select-option-a';

export const getComponentCss = (isDisabled: boolean, selected: boolean): string => {
  const checkboxDimension = `calc(${ref(cssVarInternalCheckboxScaling)} * 1.75rem)`;
  const labelPaddingTop = `max(0px, calc((${checkboxDimension} - ${ref(leadingNormal)}) / 2))`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...(isDisabled && getDisabledBaseStyles()),
          scrollMarginBlockStart: `calc(max(2px, ${ref(cssVarInternalMultiSelectOptionScaling, 1)} * 6px) + 36px)`, // 36px input height + 6px padding
          scrollMarginBlockEnd: `max(2px, ${ref(cssVarInternalMultiSelectOptionScaling, 1)} * 6px)`, // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
          [`${cssVarInternalCheckboxScaling}`]: ref(cssVarInternalMultiSelectOptionScaling),
        }),
      },
      slot: {
        display: 'block',
        paddingTop: labelPaddingTop,
      },
    },
    option: getOptionJssStyle('multi-select-option', cssVarInternalMultiSelectOptionScaling),
    checkbox: mergeDeep(
      getCheckboxBaseStyles(isDisabled, false, true, 'none'),
      selected ? getCheckboxCheckedBaseStyles(false, 'none') : {},
      {
        flexShrink: 0,
      }
    ),
  });
};
