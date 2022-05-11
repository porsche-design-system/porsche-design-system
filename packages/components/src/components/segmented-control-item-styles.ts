import { getCss } from '../utils';
import { addImportantToRule } from '../styles';

export const getComponentCss = (isDisabled: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: addImportantToRule('block'),
      },
      button: {
        display: 'block',
        minHeight: '40px',
        height: '100%',
        width: '100%',
        padding: 0,
        ...(isDisabled && {}),
      },
    },
    icon: {},
  });
};
