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
 * @css-variable {"name": "--p-model-signature-width", "description": "Defines the width of the model signature. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVariableWidth = '--p-model-signature-width';
/**
 * @css-variable {"name": "--p-model-signature-height", "description": "Defines the height of the model signature. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVariableHeight = '--p-model-signature-height';
/**
 * @css-variable {"name": "--p-model-signature-color", "description": "Defines the color of the model signature. Overrides the `color` property when set.", "defaultValue": ""}
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

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        maxWidth: '100%',
        maxHeight: '100%',

        ...addImportantToEachRule({
          ...(size !== 'inherit' && {
            height: `var(${cssVariableHeight}, auto)`,
            width: `var(${cssVariableWidth}, ${width}px)`,
          }),
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
