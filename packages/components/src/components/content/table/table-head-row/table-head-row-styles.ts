import { addImportantToEachRule, attachCss, buildHostStyles, getCachedComponentCss, getCss } from '../../../../utils';

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
  attachCss(host, getCachedComponentCss(host, getComponentCss));
};
