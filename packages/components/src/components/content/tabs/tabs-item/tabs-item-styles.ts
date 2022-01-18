import {addImportantToEachRule, getCss} from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    ':host': addImportantToEachRule({
      display: 'block',
      '&([hidden])': {
        display: 'none',
      },
    }),
  });
};
