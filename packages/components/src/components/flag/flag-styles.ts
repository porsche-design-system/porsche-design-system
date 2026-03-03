import {
  fontFamily,
  fontLineHeight,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
} from '@porsche-design-system/emotion';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { getCss } from '../../utils';
import type { FlagSize } from './flag-utils';

const sizeMap: Record<Exclude<FlagSize, 'inherit'>, string> = {
  'xx-small': fontSizeTextXXSmall,
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
};

export const getComponentCss = (size: FlagSize): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      img: {
        all: 'unset',
        display: 'block', // without display, img tag gets some extra spacing
        padding: '1px', // add safe-zone to be visually in sync with <p-icon />
        boxSizing: 'border-box',
        pointerEvents: 'none', // disable dragging/ghosting of images
        ...(size === 'inherit'
          ? {
              width: size,
              height: size,
            }
          : {
              width: fontLineHeight,
              height: fontLineHeight,
              font: `${sizeMap[size]} ${fontFamily}`,
            }),
      },
    },
  });
};
