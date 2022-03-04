import { getCss } from '../../../../utils';
import { addImportantToRule } from '../../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: addImportantToRule('table-header-group'),
      },
    },
  });
};
