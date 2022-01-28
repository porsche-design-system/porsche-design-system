import { getCss } from '../../../../utils';
import { pxToRemWithUnit } from '../../../../styles';

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
