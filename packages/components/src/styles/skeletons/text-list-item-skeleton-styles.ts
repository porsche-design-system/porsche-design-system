import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { getTextHeadlineSkeletonBaseJssStyle } from './text-skeleton-styles';
import { extendPseudoWithThemeJssStyle, getThemedPseudoJssStyle } from './base-skeleton-styles';

export const getTextListItemSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text-list-item': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            styleFunction: () => getTextHeadlineSkeletonBaseJssStyle(),
          }),
          minHeight: pxToRemWithUnit(24),
          height: 'auto',
          ...getThemedPseudoJssStyle(),
        },
      },
    },
  });
};
