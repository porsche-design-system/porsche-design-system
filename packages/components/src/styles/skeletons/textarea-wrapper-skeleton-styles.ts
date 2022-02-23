import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { extendPseudoWithTheme, getBaseSkeletonStyle, getSkeletonElementHeight, getThemedPseudoStyle } from './';

export const getTextareaWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-textarea-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            stylesFunction: getBaseSkeletonStyle,
          }),
          height: '100%',
          minHeight: getSkeletonElementHeight(192),
          ...getThemedPseudoStyle(true),
        },
      },
    },
  });
};
