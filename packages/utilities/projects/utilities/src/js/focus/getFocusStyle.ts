import { borderWidth } from '../border';
import { themeLight } from '../theme';

type GetFocusOptions = {
  offset?: string;
};

export const getFocusStyle = (opts?: GetFocusOptions) => {
  return {
    '&:focus': {
      outline: `${themeLight.state.focus} solid ${borderWidth.base}`,
      outlineOffset: opts?.offset || '2px',
      // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
      '&:not(:focus-visible)': {
        outlineColor: 'transparent',
      },
    },
  } as const;
};
