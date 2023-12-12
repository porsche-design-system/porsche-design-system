import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { spacingFluidSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (multiline: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'table-cell',
        verticalAlign: 'middle',
        ...addImportantToEachRule({
          padding: spacingFluidSmall,
          margin: 0,
          whiteSpace: multiline ? 'normal' : 'nowrap',
          ...hostHiddenStyles,
        }),
      },
    },
  });
};
