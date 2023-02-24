import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors, hostHiddenStyles } from '../../../styles';
import { spacingFluidSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (multiline: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          display: 'table-cell',
          padding: spacingFluidSmall,
          margin: 0,
          borderBottom: `1px solid ${getThemedColors('light').contrastLowColor}`,
          whiteSpace: multiline ? 'normal' : 'nowrap',
          ...hostHiddenStyles,
          transform: 'translate3d(0,0,0)', // Change stacking context for hover state
        }),
        verticalAlign: 'middle',
      },
    },
  });
};
