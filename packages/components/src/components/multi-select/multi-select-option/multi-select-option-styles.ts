import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { getSelectOptionStyles } from '../../../styles/select/option-styles';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    ...getSelectOptionStyles(theme),
  });
};
