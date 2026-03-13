import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  colorContrastHigh,
  colorContrastLow,
  colorContrastMedium,
  colorError,
  colorInfo,
  colorPrimary,
  colorSuccess,
  colorWarning,
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
import type { BreakpointCustomizable, IconName } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { buildIconUrl, type IconColor, type IconSize } from './icon-utils';

/**
 * @css-variable {"name": "--p-icon-size", "description": "Defines the width and height of the icon. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVarSize = '--p-icon-size';

/**
 * @css-variable {"name": "--p-icon-color", "description": "Defines the icon color.", "defaultValue": ""}
 */
const cssVarColor = '--p-icon-color';

const colorMap: Record<IconColor, string> = {
  primary: colorPrimary,
  'contrast-high': colorContrastHigh,
  'contrast-medium': colorContrastMedium,
  'contrast-low': colorContrastLow,
  success: colorSuccess,
  warning: colorWarning,
  error: colorError,
  info: colorInfo,
  inherit: 'currentcolor',
};

const sizeMap: Record<IconSize, string> = {
  'xx-small': typescale2Xs,
  'x-small': typescaleXs,
  small: typescaleSm,
  medium: typescaleMd,
  large: typescaleLg,
  'x-large': typescaleXl,
  'xx-large': typescale2Xl,
  inherit: 'inherit',
};

const isFlippableIcon = (name: IconName, source: string): boolean => {
  return (
    !source &&
    (name === 'arrow-compact-left' ||
      name === 'arrow-compact-right' ||
      name === 'arrow-double-left' ||
      name === 'arrow-double-right' ||
      name === 'arrow-first' ||
      name === 'arrow-head-left' ||
      name === 'arrow-head-right' ||
      name === 'arrow-last' ||
      name === 'arrow-left' ||
      name === 'arrow-right' ||
      name === 'chart' ||
      name === 'chat' ||
      name === 'copy' ||
      name === 'external' ||
      name === 'increase' ||
      name === 'list' ||
      name === 'logout' ||
      name === 'return' ||
      name === 'send')
  );
};

export const getComponentCss = (
  name: IconName,
  source: string,
  color: IconColor,
  size: BreakpointCustomizable<IconSize>
): string => {
  const dimension = `var(${cssVarSize},${leadingNormal})`;
  const mask = `url("${buildIconUrl(source || name)}") center/contain no-repeat`;

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      // the <img /> is needed for a11y compliance because of alt text and to handle the fetch priority
      img: {
        all: 'unset',
        display: 'block', // without display, img tag gets some extra spacing
        objectPosition: '-9999px -9999px', // hide the actual image content, the mask + background still renders the icon
        overflow: 'hidden', // clip the image
        pointerEvents: 'none', // disable dragging/ghosting of images
        width: dimension,
        height: dimension,
        fontFamily: fontPorscheNext, // needed for correct width/height definition based on ex-unit
        ...buildResponsiveStyles(size, (s: IconSize) => ({
          fontSize: sizeMap[s], // needed for correct width/height definition based on ex-unit
        })),
        WebkitMask: mask, // necessary for Sogou browser support :-)
        mask,
        background: `var(${cssVarColor},${colorMap[color]})`,
        forcedColorAdjust: 'none',
        ...(isFlippableIcon(name, source) && {
          '&(:dir(rtl))': {
            transform: 'scaleX(-1)',
          },
        }),
      },
    },
  });
};
