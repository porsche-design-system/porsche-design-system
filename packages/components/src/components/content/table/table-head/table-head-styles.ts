import { addImportantToRule, getCss } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    ':host': {
      display: addImportantToRule('table-header-group'),
    },
  });
};
