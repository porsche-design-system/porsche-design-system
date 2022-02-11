import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';

export const getFieldsetWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-fieldset-wrapper': {
        '&:not(.hydrated)': {
          visibility: 'visible',
          margin: `${pxToRemWithUnit(28)} 0 0 0`,
        },
      },
    },
  });
};
