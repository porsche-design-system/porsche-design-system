import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import { getOptionJssStyle } from '../../../styles/select';
import type { Theme } from '../../../types';
import { getCss } from '../../../utils';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          scrollMargin: '6px', // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    option: getOptionJssStyle('multi-select-option', 1, theme),
    checkbox: {
      pointerEvents: 'none', // Avoid checkbox label click which updates input within p-checkbox-wrapper
    },
  });
};
