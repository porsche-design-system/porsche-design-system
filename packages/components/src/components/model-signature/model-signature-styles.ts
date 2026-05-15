import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';
import { addImportantToEachRule, forcedColorsMediaQuery, hostHiddenStyles } from '../../styles';
import { colorContrastHigh, colorContrastLow, colorContrastMedium, colorPrimary } from '../../styles/css-variables';
import { getCss } from '../../utils';
import {
  getSvgUrl,
  type ModelSignatureColor,
  type ModelSignatureModel,
  type ModelSignatureSize,
} from './model-signature-utils';

/**
 * @css-variable {"name": "--p-model-signature-width", "description": "Overrides the width of the model signature. Only takes effect when `size` is not `inherit`.", "defaultValue": ""}
 */
const cssVariableWidth = '--p-model-signature-width';

/**
 * @css-variable {"name": "--p-model-signature-height", "description": "Overrides the height of the model signature.", "defaultValue": "auto"}
 */
const cssVariableHeight = '--p-model-signature-height';

/**
 * @css-variable {"name": "--p-model-signature-color", "description": "Overrides the fill color of the model signature. Overrides the `color` property when set.", "defaultValue": ""}
 */
const cssVariableColor = '--p-model-signature-color';

const colorMap: Record<ModelSignatureColor, string> = {
  primary: colorPrimary,
  'contrast-low': colorContrastLow,
  'contrast-medium': colorContrastMedium,
  'contrast-high': colorContrastHigh,
  inherit: 'currentcolor',
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
        ...addImportantToEachRule({
          mask: `url(${getSvgUrl(model)}) no-repeat left top / contain`,
          aspectRatio: `${width} / ${safeZone ? 36 : height}`, // 36px is the max-height for SVG model signature creation
          background: `var(${cssVariableColor},${colorMap[color]})`, // color="inherit" will use currentcolor for inheritance
          ...forcedColorsMediaQuery({
            background: 'CanvasText',
          }),
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
