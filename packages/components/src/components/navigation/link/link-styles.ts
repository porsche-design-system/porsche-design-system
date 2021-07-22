import type { Styles } from 'jss';
import { addImportantToEachRule, buildGlobalStyles, getCss, getTagName, insertSlottedStyles } from '../../../utils';
import { color } from '@porsche-design-system/utilities';

export const getSlottedStyles = (): Styles => {
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
      outlineColor: color.neutralContrast.high,
    },

    '&[theme="dark"] a:focus::before': {
      outlineColor: color.background.default,
    },

    '&[variant="primary"] a:focus::before, &[theme="dark"][variant="primary"] a:focus::before': {
      outlineColor: color.state.hover,
    },

    '& a:focus:not(:focus-visible)::before, &[theme="dark"] a:focus:not(:focus-visible)::before, &[variant="primary"] a:focus:not(:focus-visible)::before, &[theme="dark"][variant="primary"] a:focus:not(:focus-visible)::before':
      {
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
