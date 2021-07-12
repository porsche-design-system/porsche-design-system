import {
  addImportantToEachRule,
  buildGlobalStyles,
  getBaseSlottedStyles,
  getCss,
  getTagName,
  insertSlottedStyles,
} from '../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildGlobalStyles({
      [`${getTagName(host)} [slot="heading"]`]: addImportantToEachRule(getBaseSlottedStyles()),
    })
  );
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
