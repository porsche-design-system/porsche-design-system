import type { Styles } from 'jss';
import { addImportantToEachRule, buildGlobalStyles, getCss, getTagName, insertSlottedStyles } from '../../../utils';

export const getSlottedLinkStyles = (): Styles => {
  return {
    '& a::before': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      right: '-1px',
      bottom: '-1px',
      display: 'block',
      outline: 'transparent solid 1px',
      outlineOffset: '2px',
    },

    '& a:focus::before': {
      outlineColor: '#323639',
    },

    '&[theme="dark"] a:focus::before': {
      outlineColor: '#fff',
    },

    '&[variant="primary"] a:focus::before, &[theme="dark"][variant="primary"] a:focus::before': {
      outlineColor: '#d5001c',
    },

    '& a:focus:not(:focus-visible)::before, &[theme="dark"] a:focus:not(:focus-visible)::before, &[variant="primary"] a:focus:not(:focus-visible)::before, &[theme="dark"][variant="primary"] a:focus:not(:focus-visible)::before':
      {
        outlineColor: 'transparent',
      },
  };
};

export const getSlottedLinkCss = (host: HTMLElement): string => {
  const jssStyle = {
    [`${getTagName(host)}`]: addImportantToEachRule(getSlottedLinkStyles()),
  };
  return getCss(buildGlobalStyles(jssStyle));
};

export const addSlottedLinkCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedLinkCss(host));
};
