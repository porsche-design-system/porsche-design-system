import { getCss, pxToRemWithUnit } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    ':host': {
      display: 'block',
    },
    root: {
      marginBottom: pxToRemWithUnit(8),
    },
  });
};
