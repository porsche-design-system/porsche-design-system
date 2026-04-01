import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { fontPorscheNext, leadingNormal } from '../../styles/css-variables';
import { sizeMap } from '../../styles/maps';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import type { FlagSize } from './flag-utils';

/**
 * @css-variable {"name": "--p-flag-size", "description": "Defines the width and height of the flag. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVarSize = '--p-flag-size';

export const getComponentCss = (size: BreakpointCustomizable<FlagSize>): string => {
  const dimension = `var(${cssVarSize},${leadingNormal})`;

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      img: {
        display: 'block', // without display, img tag gets some extra spacing
        margin: 0,
        padding: '1px', // add safe-zone to be visually in sync with <p-icon />
        border: 0,
        outline: 0,
        overflow: 'hidden', // clip the image
        boxSizing: 'border-box',
        pointerEvents: 'none', // disable dragging/ghosting of images
        width: dimension,
        height: dimension,
        fontFamily: fontPorscheNext, // needed for correct width/height definition based on ex-unit
        ...buildResponsiveStyles(size, (s: FlagSize) => ({
          fontSize: sizeMap[s], // needed for correct width/height definition based on ex-unit
        })),
      },
    },
  });
};
