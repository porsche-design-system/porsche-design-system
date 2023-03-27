import { getCss } from '../../../utils';
import { addImportantToEachRule, pxToRemWithUnit, getThemedColors, hostHiddenStyles } from '../../../styles';

export const getComponentCss = (multiline: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          display: 'table-cell',
          padding: pxToRemWithUnit(12),
          margin: 0,
          borderBottom: `1px solid ${getThemedColors('light').contrastLowColor}`,
          whiteSpace: multiline ? 'normal' : 'nowrap',
          ...hostHiddenStyles,
        }),
        verticalAlign: 'middle',
      },
    },
  });
};
