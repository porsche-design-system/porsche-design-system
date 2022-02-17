import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import type { Styles } from 'jss';

export const getFieldsetWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-fieldset-wrapper': {
        '&:not(.hydrated)': getWrapperSkeletonStyles(),
      },
    },
  });
};

export const getWrapperSkeletonStyles = (): Styles => ({
  display: 'block',
  position: 'relative',
  visibility: 'visible',
});
