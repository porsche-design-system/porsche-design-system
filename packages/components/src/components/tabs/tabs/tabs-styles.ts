import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles, pxToRemWithUnit } from '../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
    },
    root: {
      marginBottom: pxToRemWithUnit(8),
    },
  });
};
