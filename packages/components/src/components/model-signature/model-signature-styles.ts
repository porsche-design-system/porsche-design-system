import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  type ThemedColors,
} from '../../styles';
import type { ModelSignatureColor, ModelSignatureModel, ModelSignatureSize } from './model-signature-utils';
import { getSvgUrl } from './model-signature-utils';
import type { Theme } from '../../types';
import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';

const getThemedColor = (color: ModelSignatureColor, themedColors: ThemedColors): string => {
  const colorMap: Record<Exclude<ModelSignatureColor, 'inherit'>, string> = {
    primary: themedColors.primaryColor,
    'contrast-low': themedColors.contrastLowColor,
    'contrast-medium': themedColors.contrastMediumColor,
    'contrast-high': themedColors.contrastHighColor,
  };

  return colorMap[color];
};

export const getComponentCss = (
  model: ModelSignatureModel,
  safeZone: boolean,
  size: ModelSignatureSize,
  color: ModelSignatureColor,
  theme: Theme
): string => {
  const { width, height } = MODEL_SIGNATURES_MANIFEST[model];
  const isSizeInherit = size === 'inherit';
  const isColorInherit = color === 'inherit';

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          mask: `url(${getSvgUrl(model)}) no-repeat left top / contain`,
          aspectRatio: `${width} / ${safeZone ? 36 : height}`, // 36px is the max-height for SVG model signature creation
          maxWidth: '100%',
          ...(!isSizeInherit && {
            width: `${width}px`,
          }),
          ...(!isColorInherit && {
            background: getThemedColor(color, getThemedColors(theme)),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: getThemedColor(color, getThemedColors('dark')),
            }),
          }),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      '::slotted(:is(img,video))': addImportantToEachRule({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }),
      // the <img /> is only needed for a11y compliance because of alt text and to handle the fetch priority
      img: {
        opacity: 0,
        width: '1px',
        height: '1px',
      },
    },
  });
};
