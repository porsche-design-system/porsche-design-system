import { getCss } from '../../utils';
import { pxToRemWithUnit } from '../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      span: {
        display: 'block',
        padding: pxToRemWithUnit(24),
        height: pxToRemWithUnit(400),
        width: pxToRemWithUnit(320),
        backgroundColor: 'deeppink',
      },
    },
  });
};
