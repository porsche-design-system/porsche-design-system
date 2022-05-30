import { getCss } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';

export const getComponentCss = (maxWidth: number): string => {
  const minWidth = maxWidth > 200 ? 200 : maxWidth;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        width: '100%',
        gridAutoColumns: '1fr',
        gridAutoRows: '1fr',
        gridGap: '4px',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, min-content))`,
      }),
    },
  });
};
