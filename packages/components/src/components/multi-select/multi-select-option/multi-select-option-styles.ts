import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { getSelectOptionStyles } from '../../../styles/select/option-styles';
import { addImportantToEachRule } from '../../../styles';
import { spacingStaticSmall } from '../../../../../utilities/projects/utilities';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        scrollMarginTop: spacingStaticSmall,
      },
    }),
    ...getSelectOptionStyles(theme),
    checkbox: {
      pointerEvents: 'none', // Avoid checkbox label click which updates input within p-checkbox-wrapper
    },
  });
};
