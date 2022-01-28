import { getCss } from '../../../../utils';
import { addImportantToRule } from '../../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    ':host': {
      display: addImportantToRule('table-row-group'),
    },
  });
};
