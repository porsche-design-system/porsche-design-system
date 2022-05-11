import { getCss } from '../utils';
import { addImportantToEachRule } from '../styles';

export const getComponentCss = (stretch: boolean, wrap: boolean): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: stretch ? 'grid' : 'inline-grid',
        gridAutoColumns: '1fr',
        ...(stretch
          ? wrap
            ? { gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }
            : {
                gridAutoColumns: 'minmax(0, 1fr)',
                gridAutoFlow: 'column',
              }
          : {
              gridAutoFlow: 'column',
            }),
      }),
    },
  });
};
