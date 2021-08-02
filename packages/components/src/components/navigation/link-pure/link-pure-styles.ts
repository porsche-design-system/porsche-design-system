import { buildSlottedStyles, getCss, insertSlottedStyles, Styles } from '../../../utils';

type GetFocusPseudoStylesOptions = {
  color?: string;
  offset?: number;
};

/**
 * this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-(
 */
const getFocusPseudoStyles = (opts?: GetFocusPseudoStylesOptions): Styles => {
  const options: GetFocusPseudoStylesOptions = {
    color: 'currentColor',
    offset: 2,
    ...opts,
  };

  return {
    '& a::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      outline: '1px solid transparent',
      outlineOffset: `${options.offset}px`,
    },
    '& a:focus::before': {
      outlineColor: options.color,
    },
    '& a:focus:not(:focus-visible)::before': {
      outlineColor: 'transparent',
    },
  };
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getFocusPseudoStyles({ offset: 1 })));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
