import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { getCss } from '../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'table-row-group',
        ...addImportantToEachRule(hostHiddenStyles),
      },
    },
  });
};
