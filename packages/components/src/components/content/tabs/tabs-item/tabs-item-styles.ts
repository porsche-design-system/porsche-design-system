import { getCss } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    ':host': {
      display: 'block',
    },
    ':host([hidden])': {
      display: 'none',
    },
    ':host(:focus),:host(:focus-visible)': {
      outline: 'none',
    },
  });
};
