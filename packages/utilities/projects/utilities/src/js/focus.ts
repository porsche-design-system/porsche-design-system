import { Properties as CSSProperties } from 'csstype';

type GetFocusOptions = {
  color?: string;
  offset?: string;
};

type GetFocus = CSSProperties & { '&::-moz-focus-inner': CSSProperties } & {
  '&:focus': CSSProperties & { '&:not(:focus-visible)': CSSProperties };
};

export const getFocus = (opts?: GetFocusOptions): GetFocus => {
  return {
    outline: 'transparent solid 1px',
    outlineOffset: opts?.offset || '2px',
    '&::-moz-focus-inner': {
      border: '0', // fix for Firefox, avoid dotted outline in button on focus
    },
    '&:focus': {
      outlineColor: opts?.color || 'currentColor',
      // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
      '&:not(:focus-visible)': {
        outlineColor: 'transparent',
      },
    },
  };
};
