import { addImportantToEachRule, attachCss, buildHostStyles, getCachedComponentCss, getCss } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        display: 'table-row-group',
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement): void => {
  attachCss(host, getCachedComponentCss(host, getComponentCss));
};
