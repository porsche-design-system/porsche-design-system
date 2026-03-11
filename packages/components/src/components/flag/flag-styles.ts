import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  fontPorscheNext,
  leadingNormal,
  typescale2Xs,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '../../styles/css-variables';
import { getCss } from '../../utils';
import type { FlagSize } from './flag-utils';

const sizeMap: Record<Exclude<FlagSize, 'inherit'>, string> = {
  'xx-small': typescale2Xs,
  'x-small': typescaleXs,
  small: typescaleSm,
  medium: typescaleMd,
  large: typescaleLg,
  'x-large': typescaleXl,
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
              width: leadingNormal,
              height: leadingNormal,
              font: `${sizeMap[size]} ${fontPorscheNext}`,
            }),
      },
    },
  });
};
