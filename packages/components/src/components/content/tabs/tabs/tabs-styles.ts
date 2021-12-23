import { buildHostStyles, getCss, pxToRemWithUnit } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    ...buildHostStyles({
      display: 'block',
    }),
    root: {
      marginBottom: pxToRemWithUnit(8),
    },
  });
};
