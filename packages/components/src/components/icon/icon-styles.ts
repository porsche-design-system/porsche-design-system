import {
  fontFamily,
  fontLineHeight,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
} from '@porsche-design-system/styles';
import { addImportantToEachRule, colorSchemeStyles, colors, hostHiddenStyles } from '../../styles';
import type { IconName, TextSize } from '../../types';
import { getCss } from '../../utils';
import { buildIconUrl, type IconColor } from './icon-utils';

const cssVarColor = '--p-icon-color';

const {
  primaryColor,
  contrastLowColor,
  contrastMediumColor,
  contrastHighColor,
  successColor,
  errorColor,
  warningColor,
  infoColor,
  contrastDisabledColor,
} = colors;

const colorMap: Record<IconColor, string> = {
  primary: primaryColor,
  inherit: 'currentcolor',
  'contrast-low': contrastLowColor,
  'contrast-medium': contrastMediumColor,
  'contrast-high': contrastHighColor,
  'notification-success': successColor,
  'notification-warning': warningColor,
  'notification-error': errorColor,
  'notification-info': infoColor,
  'state-disabled': contrastDisabledColor,
};

const sizeMap: Record<Exclude<TextSize, 'inherit'>, string> = {
  'xx-small': fontSizeTextXXSmall,
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
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

export const getComponentCss = (name: IconName, source: string, color: IconColor, size: TextSize): string => {
  const isSizeInherit = size === 'inherit';

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        maxWidth: '100%',
        maxHeight: '100%',
        width: fontLineHeight,
        height: fontLineHeight,
        font: `${isSizeInherit ? sizeMap['small'] : sizeMap[size]} ${fontFamily}`,
        ...addImportantToEachRule({
          mask: `url(${buildIconUrl(source || name)}) no-repeat left top / contain`,
          aspectRatio: '1/1',
          background: `var(${cssVarColor}, ${colorMap[color]})`,
          ...(isFlippableIcon(name, source) && {
            '&:dir(rtl)': {
              transform: 'scaleX(-1)',
            },
          }),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      // the <img /> is only needed for a11y compliance because of alt text and to handle the fetch priority
      img: {
        all: 'unset',
        position: 'absolute', // prevents unintended bottom white-space
        opacity: 0,
        width: '1px',
        height: '1px',
        pointerEvents: 'none', // disable dragging/ghosting of images
      },
    },
  });
};
