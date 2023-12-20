import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';

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
