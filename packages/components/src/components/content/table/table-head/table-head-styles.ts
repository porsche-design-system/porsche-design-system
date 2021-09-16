import { addImportantToEachRule, attachComponentCss, buildHostStyles, getCss } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        display: 'table-header-group',
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement): void => {
  attachComponentCss(host, getComponentCss);
};
