import type { Styles } from 'jss';
import { addImportantToEachRule, buildGlobalStyles, getCss, getTagName, insertSlottedStyles } from '../../../utils';

export const getSlottedStyles = (): Styles => {
  return {
    '& a::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'block',
      outline: 'transparent solid 1px',
      outlineOffset: '2px',
    },

    '& a:focus::before': {
      outlineColor: '#000',
    },

    '&[theme="dark"] a:focus::before': {
      outlineColor: '#fff',
    },

    ' & a:focus:not(:focus-visible)::before, &[theme="dark"] a:focus:not(:focus-visible)::before': {
      outlineColor: 'transparent',
    },
  };
};

export const getSlottedCss = (host: HTMLElement): string => {
  const jssStyle = {
    [`${getTagName(host)}`]: addImportantToEachRule(getSlottedStyles()),
  };
  return getCss(buildGlobalStyles(jssStyle));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
