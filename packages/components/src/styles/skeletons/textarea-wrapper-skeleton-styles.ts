import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { extendPseudoWithTheme, getBaseSkeletonStyles, getSkeletonElementHeight, getThemedPseudoStyles } from './';

export const getTextareaWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-textarea-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            stylesFunction: getBaseSkeletonStyles,
          }),
          height: '100%',
          minHeight: getSkeletonElementHeight(192),
          ...getThemedPseudoStyles(true),
        },
      },
    },
  });
};
