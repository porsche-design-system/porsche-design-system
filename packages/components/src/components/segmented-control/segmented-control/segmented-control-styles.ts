import { getCss } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';

const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (maxWidth: number): string => {
  const minWidth = maxWidth > MAX_ITEM_WIDTH ? MAX_ITEM_WIDTH : maxWidth;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        gridAutoRows: '1fr', // for equal height
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, min-content))`,
        gridGap: '4px',
      }),
    },
  });
};
