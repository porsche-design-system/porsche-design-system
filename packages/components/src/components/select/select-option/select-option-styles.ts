import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import { getButtonImageJssStyle, getOptionJssStyle } from '../../../styles/select';
import type { Theme } from '../../../types';
import { getCss } from '../../../utils';

const cssVarInternalSelectOptionScaling = '--p-internal-select-option-scaling';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule({
        ':host': {
          scrollMarginBlockStart: `calc(max(2px, var(${cssVarInternalSelectOptionScaling}, 1) * 6px) + 36px)`, // 36px input height + 6px padding
          scrollMarginBlockEnd: `max(2px, var(${cssVarInternalSelectOptionScaling}, 1) * 6px)`, // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
        },
        '::slotted(img)': getButtonImageJssStyle,
      }),
      ...preventFoucOfNestedElementsStyles,
    },
    option: getOptionJssStyle('select-option', `var(${cssVarInternalSelectOptionScaling}, 1)`, theme),
    icon: {
      marginInlineStart: 'auto',
    },
  });
};
