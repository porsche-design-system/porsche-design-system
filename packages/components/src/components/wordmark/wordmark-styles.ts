import type { Styles } from 'jss';
import { addImportantToEachRule, forcedColorsMediaQuery, getFocusBaseStyles, hostHiddenStyles } from '../../styles';
import { colorPrimary } from '../../styles/css-variables';
import { getCss } from '../../utils';
import type { WordmarkSize } from './wordmark-utils';

/**
 * @css-variable {"name": "--p-wordmark-width", "description": "Defines the width of the wordmark. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVariableWidth = '--p-wordmark-width';
/**
 * @css-variable {"name": "--p-wordmark-height", "description": "Defines the width of the wordmark. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVariableHeight = '--p-wordmark-height';

export const getComponentCss = (size: WordmarkSize): string => {
  const sizingStyles: Styles = {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    height: 'inherit',
  };

  const defaultHeight = 'clamp(0.63rem, 0.42vw + 0.5rem, 1rem)';
  const defaultHeightSafari = 'round(down, clamp(0.63rem, 0.42vw + 0.5rem, 1rem), 1px)';

  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          maxWidth: '100%',
          maxHeight: '100%',
          boxSizing: 'content-box', // needed for correct height calculation when padding is set on host (e.g. custom click area)
          ...(size !== 'inherit' && {
            height: `var(${cssVariableHeight}, ${defaultHeight})`,
            width: `var(${cssVariableWidth}, auto)`,
            // workaround for Safari to optimize image rendering
            '@supports (height: round(down, 1px, 1px))': {
              height: `var(${cssVariableHeight}, ${defaultHeightSafari})`,
            },
          }),
          ...hostHiddenStyles,
        }),
      },
      a: {
        all: 'unset',
        ...sizingStyles,
        cursor: 'pointer',
        '&::before': {
          // needs to be defined always to have correct custom click area
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '1px',
        },
        '&:focus-visible::before': getFocusBaseStyles(),
      },
      svg: {
        ...sizingStyles,
        fill: colorPrimary,
        ...forcedColorsMediaQuery({
          fill: 'CanvasText',
        }),
      },
    },
  });
};
