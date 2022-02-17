import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { getWrapperSkeletonStyles } from './fieldset-wrapper-skeleton-styles';

export const getTextListSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text-list': {
        '&:not(.hydrated)': {
          ...getWrapperSkeletonStyles(),
          marginTop: pxToRemWithUnit(6),
        },
      },
    },
  });
};
