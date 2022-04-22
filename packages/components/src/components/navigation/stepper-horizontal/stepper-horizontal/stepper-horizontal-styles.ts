import { getCss } from '../../../../utils';
import { addImportantToEachRule } from '../../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        counterReset: 'count',
      }),
    },
  });
};
