import type { Theme } from '../theme';
import { themeDarkStateFocus, themeLightStateFocus } from '../theme';
import { borderWidthBase } from '../border';

type GetFocusOptions = {
  offset?: string;
  theme?: Theme;
};

export const getFocusStyle = (opts?: GetFocusOptions) => {
  return {
    '&:focus': {
      outline: `${opts?.theme === 'dark' ? themeDarkStateFocus : themeLightStateFocus} solid ${borderWidthBase}`,
      outlineOffset: opts?.offset || '2px',
      // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
      '&:not(:focus-visible)': {
        outlineColor: 'transparent',
      },
    },
  } as const;
};
