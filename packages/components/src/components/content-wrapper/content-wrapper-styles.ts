import type { ContentWrapperWidth } from './content-wrapper-utils';
import { getCss } from '../../utils';
import { getContentWrapperStyle } from './content-wrapper-styles-shared';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';
import { addImportantToEachRule } from '../../styles';

export const getComponentCss = (width: ContentWrapperWidth): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
    },
    root: getContentWrapperStyle(width),
  });
};
