import type { Theme } from '../../../utils';
import { getCss } from '../../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../../styles';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
    root: {},
  });
};
