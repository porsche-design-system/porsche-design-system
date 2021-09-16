import { addImportantToEachRule, attachCss, buildHostStyles, getCss } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        display: 'table-row',
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement): void => {
  attachCss(host, getComponentCss);
};
