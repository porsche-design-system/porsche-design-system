import { getCss } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    ':host': {
      display: 'block',
      '&([hidden])': {
        display: 'none',
      },
      // '&(:focus),&(:focus-visible)': {
      //   outline: 'none',
      // },
    },
  });
};
