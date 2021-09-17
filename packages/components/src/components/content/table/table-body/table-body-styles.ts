import { addImportantToEachRule, buildHostStyles, getCss } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        display: 'table-row-group',
      })
    )
  );
};
