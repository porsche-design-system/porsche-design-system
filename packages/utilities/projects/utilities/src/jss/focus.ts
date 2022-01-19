import type { JssStyle } from 'jss';

type GetFocusStylesOptions = {
  color?: string;
  offset?: string;
};

export const getFocusJssStyle = (opts?: GetFocusStylesOptions): JssStyle => {
  return {
    outline: 'transparent solid 1px',
    outlineOffset: opts?.offset || '2px',
    '&::-moz-focus-inner': {
      border: '0',
    },
    '&:focus': {
      outlineColor: opts?.color || 'currentColor',
      '&:not(:focus-visible)': {
        outlineColor: 'transparent',
      },
    },
  };
};
