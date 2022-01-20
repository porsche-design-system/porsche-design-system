import { getCss } from '../../../../utils';
import { addImportantToEachRule, pxToRemWithUnit, getThemedColors } from '../../../../styles';

export const getComponentCss = (multiline: boolean): string => {
  return getCss({
    ':host': addImportantToEachRule({
      display: 'table-cell',
      padding: pxToRemWithUnit(12),
      margin: 0,
      verticalAlign: 'middle',
      borderBottom: `1px solid ${getThemedColors('light').contrastLowColor}`,
      whiteSpace: multiline ? 'normal' : 'nowrap',
    }),
  });
};
