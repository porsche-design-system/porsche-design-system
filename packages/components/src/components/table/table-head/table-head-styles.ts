import { fontPorscheNext, fontWeightSemibold, leadingNormal, ref, typescaleXs } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
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
          font: `${ref(fontWeightSemibold)} ${ref(typescaleXs)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
          borderBottom: `1px solid ${ref(cssVariableTableBorderColor)}`,
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
