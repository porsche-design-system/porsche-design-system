import { fontFamily, fontLineHeight, fontSizeTextSmall } from '@porsche-design-system/styles';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { cssVarInternalCheckboxScaling, getCheckboxBaseStyles } from '../../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../../styles/checkbox/checkbox-checked-base-styles';
import { getOptionJssStyle } from '../../../styles/select';
import { getCss } from '../../../utils';

export const cssVarInternalMultiSelectOptionScaling = '--p-internal-multi-select-option-scaling';

export const getComponentCss = (isDisabled: boolean, selected: boolean): string => {
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
      slot: {
        display: 'block',
      },
    },
    option: getOptionJssStyle('multi-select-option', `var(${cssVarInternalMultiSelectOptionScaling}, 1)`),
    'checkbox-wrapper': {
      fontFamily: fontFamily,
      fontSize: fontSizeTextSmall,
      height: fontLineHeight,
      display: 'flex',
      alignItems: 'center',
    },
    checkbox: {
      flexShrink: 0,
      ...getCheckboxBaseStyles(isDisabled),
      ...(selected && getCheckboxCheckedBaseStyles(isDisabled)),
    },
  });
};
