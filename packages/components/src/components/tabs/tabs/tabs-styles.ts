import { getCss } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';
import { hostHiddenStyles } from '../../../styles/host-hidden-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
    },
    root: {
      marginBottom: '8px',
    },
  });
};
