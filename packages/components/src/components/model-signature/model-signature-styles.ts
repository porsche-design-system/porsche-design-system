import { getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import type { ModelSignatureColor, ModelSignatureSize } from './model-signature-utils';
import type { Theme } from '../../types';

const toFilter = (values: [number, number, number, number, number, number]): string =>
  `invert(${values[0]}%) sepia(${values[1]}%) saturate(${values[2]}%) hue-rotate(${values[3]}deg) brightness(${values[4]}%) contrast(${values[5]}%)`;

// copied from icon-styles
const filterLightPrimary = toFilter([3, 7, 2930, 188, 91, 103]);
const filterLightContrastLow = toFilter([93, 11, 36, 201, 89, 102]);
const filterLightContrastMedium = toFilter([65, 6, 119, 187, 90, 92]);
const filterLightContrastHigh = toFilter([40, 2, 686, 187, 80, 94]);

const filterDarkPrimary = toFilter([97, 55, 2840, 180, 114, 103]);
const filterDarkContrastLow = toFilter([20, 7, 421, 202, 97, 82]);
const filterDarkContrastMedium = toFilter([54, 4, 229, 187, 91, 84]);
const filterDarkContrastHigh = toFilter([68, 6, 108, 187, 104, 88]);

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
        ...(!isColorInherit && { filter: colorToFilterMap[theme][color] }),
        ...(isSizeInherit && { height: size }),
      },
    },
  });
};
