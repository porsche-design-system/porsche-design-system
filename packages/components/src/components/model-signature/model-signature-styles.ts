import { getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  hostHiddenStyles,
  getSchemedHighContrastMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import type { ModelSignatureColor, ModelSignatureSize } from './model-signature-utils';
import type { Theme } from '../../types';
import {
  filterDarkContrastHigh,
  filterDarkContrastLow,
  filterDarkContrastMedium,
  filterDarkPrimary,
  filterLightContrastHigh,
  filterLightContrastLow,
  filterLightContrastMedium,
  filterLightPrimary,
} from '../../styles/color-filters';
import { modelSignatureHeight } from './model-signature-utils';

const colorToFilterLight: Record<Exclude<ModelSignatureColor, 'inherit'>, string> = {
  primary: filterLightPrimary,
  'contrast-low': filterLightContrastLow,
  'contrast-medium': filterLightContrastMedium,
  'contrast-high': filterLightContrastHigh,
};

const colorToFilterDark: Record<Exclude<ModelSignatureColor, 'inherit'>, string> = {
  primary: filterDarkPrimary,
  'contrast-low': filterDarkContrastLow,
  'contrast-medium': filterDarkContrastMedium,
  'contrast-high': filterDarkContrastHigh,
};

const colorToFilterMap: Record<Theme, Record<Exclude<ModelSignatureColor, 'inherit'>, string>> = {
  auto: colorToFilterLight,
  light: colorToFilterLight,
  dark: colorToFilterDark,
};

export const getComponentCss = (size: ModelSignatureSize, color: ModelSignatureColor, theme: Theme): string => {
  const isSizeInherit = size === 'inherit';
  const isColorInherit = color === 'inherit';

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          maxWidth: '100%',
          maxHeight: '100%',
          ...(!isSizeInherit && {
            width: 'inherit',
            height: 'inherit',
            // TODO: we need a width map of all signatures to ensure same fluid behavior like implemented fro crest + wordmark
            maxHeight: `${modelSignatureHeight}px`,
          }),
          ...hostHiddenStyles,
        }),
      },
      img: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        pointerEvents: 'none', // prevents image drag
        ...(!isColorInherit && {
          filter: colorToFilterMap[theme][color],
          ...prefersColorSchemeDarkMediaQuery(theme, {
            filter: colorToFilterMap.dark[color],
          }),
          ...(isHighContrastMode &&
            getSchemedHighContrastMediaQuery(
              {
                filter: colorToFilterMap.light[color],
              },
              {
                filter: colorToFilterMap.dark[color],
              }
            )),
        }),
        ...(isSizeInherit && { height: size }),
      },
    },
  });
};
