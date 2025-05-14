import { addImportantToEachRule, hostHiddenStyles, SCALING_BASE_VALUE } from '../../../styles';
import { getOptionJssStyle } from '../../../styles/select';
import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { borderWidthBase, fontLineHeight } from '@porsche-design-system/styles';
import { getCheckboxBaseStyles } from '../../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../../styles/checkbox/checkbox-checked-base-styles';

export const getComponentCss = (theme: Theme, isDisabled: boolean, selected: boolean): string => {
  const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${fontLineHeight}))`;

  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
  const paddingTop = `calc((${dimensionFull} - ${fontLineHeight}) / 2)`; // Vertically centers the checkbox label relative to the checkbox size.

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          scrollMargin: '6px', // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
        }),
      },
      slot: {
        display: 'block',
        paddingTop,
      },
    },
    option: {
      ...getOptionJssStyle('multi-select-option', 1, theme),
      columnGap: '8px',
    },
    checkbox: {
      flexShrink: 0,
      ...getCheckboxBaseStyles(theme, isDisabled),
      ...(selected && getCheckboxCheckedBaseStyles(theme, isDisabled)),
    },
  });
};
