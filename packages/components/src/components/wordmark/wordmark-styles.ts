import type { WordmarkSize } from './wordmark-utils';
import type { Theme } from '../../types';
import { getCss } from '../../utils';
import { addImportantToEachRule, getFocusJssStyle, getThemedColors, hostHiddenStyles } from '../../styles';
import { filterDarkPrimary, filterLightPrimary } from '../../styles/color-filters';

export const getComponentCss = (size: WordmarkSize, theme: Theme): string => {
  const isSizeInherit = size === 'inherit';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          outline: 0,
          ...hostHiddenStyles,
        }),
      },
      a: {
        display: 'block',
        textDecoration: 'none',
        ...getFocusJssStyle({
          color: getThemedColors('light').primaryColor,
          offset: 0,
          pseudo: '::before',
        }),
      },
      img: {
        display: 'block',
        // pointerEvents: 'none', // prevents image drag // TODO: check if needed
        filter: theme === 'light' ? filterLightPrimary : filterDarkPrimary,
        height: isSizeInherit ? size : 'clamp(0.63rem, 0.42vw + 0.5rem, 1rem)',
      },
    },
  });
};
