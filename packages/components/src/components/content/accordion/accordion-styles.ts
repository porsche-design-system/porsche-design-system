import {
  addImportantToEachRule,
  buildGlobalStyles,
  getBaseSlottedStyles,
  getCss,
  getTagName,
  insertSlottedStyles,
} from '../../../utils';

export const getSlottedAccordionCss = (host: HTMLElement): string => {
  return getCss(
    buildGlobalStyles({
      [`${getTagName(host)} [slot="heading"]`]: addImportantToEachRule(getBaseSlottedStyles()),
      [`${getTagName(host)}[theme="dark"] [slot="heading"]`]: addImportantToEachRule(getBaseSlottedStyles('dark')),
    })
  );
};

export const addSlottedAccordionCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedAccordionCss(host));
};
