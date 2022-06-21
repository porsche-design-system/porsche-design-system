import { getCss } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';

const MIN_ITEM_WIDTH = 46;
const MAX_ITEM_WIDTH = 220;

export const getComponentCss = (maxWidth: number): string => {
  maxWidth = (maxWidth > MAX_ITEM_WIDTH && MAX_ITEM_WIDTH) || (maxWidth < MIN_ITEM_WIDTH && MIN_ITEM_WIDTH) || maxWidth;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        gridAutoRows: '1fr', // for equal height
        gridTemplateColumns: `repeat(auto-fit, ${maxWidth}px)`,
        gridGap: '4px',
      }),
    },
  });
};
