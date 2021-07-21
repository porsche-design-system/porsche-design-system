import {
  addImportantToEachRule,
  buildGlobalStyles,
  getBaseSlottedStyles,
  getCss,
  getTagName,
  insertSlottedStyles,
  Styles,
} from '../../../utils';

export const getSlottedTextFieldWrapperStyles = (): Styles => {
  return {
    ...getBaseSlottedStyles(),
    '& input&::-webkit-outer-spin-button, & input::-webkit-inner-spin-button, & input[type="search"]::-webkit-search-decoration':
      {
        WebkitAppearance: 'none',
        appearance: 'none',
      },
    '& input[type="text"]::-webkit-contacts-auto-fill-button, & input[type="text"]::-webkit-credentials-auto-fill-button':
      {
        marginRight: '2.4375rem',
      },
  };
};

export const getSlottedTextFieldWrapperCss = (host: HTMLElement): string => {
  const jssStyle = {
    [`${getTagName(host)}`]: addImportantToEachRule(getSlottedTextFieldWrapperStyles()),
  };
  return getCss(buildGlobalStyles(jssStyle));
};

export const addSlottedTextFieldWrapperCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedTextFieldWrapperCss(host));
};
