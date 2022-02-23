import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { getTextHeadlineSkeletonStyle } from './text-skeleton-styles';
import { extendPseudoWithTheme, getThemedPseudoStyle } from './base-skeleton-styles';

export const getTextListItemSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text-list-item': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            styleFunction: () => getTextHeadlineSkeletonStyle(),
          }),
          minHeight: pxToRemWithUnit(24),
          height: 'auto',
          ...getThemedPseudoStyle(),
        },
      },
    },
  });
};
