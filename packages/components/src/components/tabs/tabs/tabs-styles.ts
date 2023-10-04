import { getCss } from '../../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
    root: {
      marginBottom: '8px',
    },
  });
};
