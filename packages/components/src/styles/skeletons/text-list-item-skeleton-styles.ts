import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { getTextHeadlineSkeletonStyles } from './text-skeleton-styles';
import { extendPseudoWithTheme, getThemedPseudoStyles } from './skeleton-base-styles';

export const getTextListItemSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text-list-item': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            stylesFunction: () => getTextHeadlineSkeletonStyles(),
          }),
          minHeight: pxToRemWithUnit(24),
          height: 'auto',
          ...getThemedPseudoStyles(),
        },
      },
    },
  });
};
