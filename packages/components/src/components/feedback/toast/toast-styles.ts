import { addImportantToEachRule, attachComponentCss, buildHostStyles, getCss, pxToRemWithUnit } from '../../../utils';

export const getComponentCss = (): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        position: 'fixed',
        bottom: pxToRemWithUnit(8),
        left: pxToRemWithUnit(8),
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement): void => {
  attachComponentCss(host, getComponentCss);
};
