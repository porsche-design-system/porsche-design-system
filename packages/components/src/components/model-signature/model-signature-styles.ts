import { getCss, highContrastMode } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles, getSchemedHighContrastMediaQuery } from '../../styles';
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

const colorToFilterMap: Record<Theme, Record<Exclude<ModelSignatureColor, 'inherit'>, string>> = {
  light: {
    primary: filterLightPrimary,
    'contrast-low': filterLightContrastLow,
    'contrast-medium': filterLightContrastMedium,
    'contrast-high': filterLightContrastHigh,
  },
  dark: {
    primary: filterDarkPrimary,
    'contrast-low': filterDarkContrastLow,
    'contrast-medium': filterDarkContrastMedium,
    'contrast-high': filterDarkContrastHigh,
  },
};

export const getComponentCss = (size: ModelSignatureSize, color: ModelSignatureColor, theme: Theme): string => {
  const isSizeInherit = size === 'inherit';
  const isColorInherit = color === 'inherit';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      img: {
        display: 'block',
        pointerEvents: 'none', // prevents image drag
        ...(!isColorInherit && {
          filter: colorToFilterMap[theme][color],
          ...(highContrastMode &&
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
