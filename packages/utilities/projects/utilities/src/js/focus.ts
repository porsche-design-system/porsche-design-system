type GetFocusOptions = {
  offset?: string;
};

type GetFocus = {
  '&:focus': {
    outline: string;
    outlineOffset: string;
    '&:not(:focus-visible)': {
      outlineColor: 'transparent';
    };
  };
};

export const getFocus = (opts?: GetFocusOptions): GetFocus => {
  return {
    '&:focus': {
      outline: 'deeppink solid 1px',
      outlineOffset: opts?.offset || '2px',
      // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
      '&:not(:focus-visible)': {
        outlineColor: 'transparent',
      },
    },
  };
};
