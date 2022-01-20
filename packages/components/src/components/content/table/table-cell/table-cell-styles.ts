import { getCss } from '../../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../../styles/styles';
import { color } from '@porsche-design-system/utilities';

export const getComponentCss = (multiline: boolean): string => {
  return getCss({
    ':host': addImportantToEachRule({
      display: 'table-cell',
      padding: pxToRemWithUnit(12),
      margin: 0,
      verticalAlign: 'middle',
      borderBottom: `1px solid ${color.neutralContrast.low}`,
      whiteSpace: multiline ? 'normal' : 'nowrap',
    }),
  });
};
