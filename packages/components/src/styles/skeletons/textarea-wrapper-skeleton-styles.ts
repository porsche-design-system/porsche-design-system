import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getBaseSkeletonStyles, getSkeletonElementHeight } from './';

export const getTextareaWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-textarea-wrapper': {
        '&:not(.hydrated)': {
          height: '100%',
          minHeight: getSkeletonElementHeight(192),
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
