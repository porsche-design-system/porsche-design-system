import { getCss } from '../../../utils';
import type { SegmentedControlBackgroundColor } from './segmented-control-utils';
import type { Theme } from '../../../types';
import { addImportantToEachRule, getThemedColors } from '../../../styles';

export const getComponentCss = (
  bgColor: SegmentedControlBackgroundColor,
  wrap: boolean,
  maxWidth: number,
  theme: Theme
): string => {
  console.log(bgColor, theme);
  const minWidth = maxWidth > 200 ? 200 : maxWidth;
  const { backgroundColor, backgroundSurfaceColor, baseColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        display: wrap ? 'grid' : 'inline-grid',
        gridAutoColumns: '1fr',
        gridAutoRows: '1fr',
        gridGap: '4px',
        ...(wrap
          ? {
              gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, min-content))`,
            }
          : {
              gridAutoFlow: 'column',
            }),
      },
      '::slotted(*)': addImportantToEachRule({
        color: baseColor,
        background: bgColor === 'background-surface' ? backgroundColor : backgroundSurfaceColor,
      }),
    },
  });
};
