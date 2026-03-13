import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  fontPorscheNext,
  leadingNormal,
  typescale2Xl,
  typescale2Xs,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '../../styles/css-variables';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import type { IconSize } from '../icon/icon-utils';
import type { FlagSize } from './flag-utils';

/**
 * @css-variable {"name": "--p-flag-size", "description": "Defines the width and height of the flag. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVarSize = '--p-flag-size';

const sizeMap: Record<FlagSize, string> = {
  'xx-small': typescale2Xs,
  'x-small': typescaleXs,
  small: typescaleSm,
  medium: typescaleMd,
  large: typescaleLg,
  'x-large': typescaleXl,
  'xx-large': typescale2Xl,
  inherit: 'inherit',
};

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
        ...buildResponsiveStyles(size, (s: IconSize) => ({
          fontSize: sizeMap[s], // needed for correct width/height definition based on ex-unit
        })),
      },
    },
  });
};
