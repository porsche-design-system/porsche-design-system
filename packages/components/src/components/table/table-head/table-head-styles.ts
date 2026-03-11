import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { fontPorscheNext, fontWeightSemibold, leadingNormal, typescaleXs } from '../../../styles/css-variables';
import { getCss } from '../../../utils';
import {
  cssVariableTableBorderColor,
  cssVariableTableBorderWidth,
  cssVariableTableHoverColor,
} from '../table/table-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'table-header-group',
        ...addImportantToEachRule({
          font: `${fontWeightSemibold} ${typescaleXs}/${leadingNormal} ${fontPorscheNext}`,
          borderBottom: `1px solid var(${cssVariableTableBorderColor})`,
          ...hostHiddenStyles,
        }),
      },
      '::slotted(*)': addImportantToEachRule({
        [cssVariableTableBorderWidth]: '0px',
        [cssVariableTableHoverColor]: 'none',
      }),
    },
  });
};
