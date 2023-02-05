import type { Theme } from '../theme';
import { themeDarkStateFocus, themeLightStateFocus } from '../theme';
import { borderRadiusMedium, borderRadiusSmall, borderWidthBase } from '../border';

type Size = 'small' | 'medium';
type GetFocusOptions = {
  offset?: Size | string;
  borderRadius?: Size;
  theme?: Theme;
};

export const getFocusStyle = (opts?: GetFocusOptions) => {
  const offset = opts?.offset === 'small' ? '-4px' : opts?.offset === 'medium' ? '-6px' : opts?.offset || '-4px';

  return {
    position: 'relative',
    // we can't use outline, since border-radius has no effect on outline style in Safari
    outline: 0,
    '&:focus::before': {
      content: '""',
      position: 'absolute',
      // we can use inset as soon as browser support is sufficient
      top: offset,
      left: offset,
      right: offset,
      bottom: offset,
      border: `${borderWidthBase} solid ${opts?.theme === 'dark' ? themeDarkStateFocus : themeLightStateFocus}`,
      borderRadius: opts?.borderRadius === 'medium' ? borderRadiusMedium : borderRadiusSmall,
    },
    // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
    '&:focus:not(:focus-visible)::before': {
      borderColor: 'transparent',
    },
  } as const;
};
