import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';
import { addImportantToEachRule, colors, hostHiddenStyles } from '../../styles';
import { getCss } from '../../utils';
import {
  getSvgUrl,
  type ModelSignatureColor,
  type ModelSignatureModel,
  type ModelSignatureSize,
} from './model-signature-utils';

const cssVariableWidth = '--p-model-signature-width';
const cssVariableHeight = '--p-model-signature-height';
const cssVariableColor = '--p-model-signature-color';

const { primaryColor, contrastLowColor, contrastMediumColor, contrastHighColor } = colors;

const colorMap: Record<ModelSignatureColor, string> = {
  primary: primaryColor,
  'contrast-low': contrastLowColor,
  'contrast-medium': contrastMediumColor,
  'contrast-high': contrastHighColor,
  inherit: 'inherit',
};

export const getComponentCss = (
  model: ModelSignatureModel,
  safeZone: boolean,
  size: ModelSignatureSize,
  color: ModelSignatureColor
): string => {
  const { width, height } = MODEL_SIGNATURES_MANIFEST[model];
  const isSizeInherit = size === 'inherit';

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        maxWidth: '100%',
        maxHeight: '100%',
        // width + height style can't be !important atm to be backwards compatible with e.g. `<p-model-signature size="inherit" style="height: 50px"/>`
        width: `var(${cssVariableWidth},${isSizeInherit ? 'auto' : `${width}px`})`,
        height: `var(${cssVariableHeight},auto)`,
        color: `var(${cssVariableColor},${colorMap[color]})`,
        ...addImportantToEachRule({
          mask: `url(${getSvgUrl(model)}) no-repeat left top / contain`,
          aspectRatio: `${width} / ${safeZone ? 36 : height}`, // 36px is the max-height for SVG model signature creation
          background: 'currentcolor', // necessary for proper color inheritance
          ...hostHiddenStyles,
        }),
      },
      '::slotted(:is(img,video))': addImportantToEachRule({
        display: 'block', // prevents unintended bottom white-space
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }),
      // the <img /> is only needed for a11y compliance because of alt text and to handle the fetch priority
      img: {
        position: 'absolute', // prevents unintended bottom white-space
        opacity: 0,
        width: '1px',
        height: '1px',
      },
    },
  });
};
