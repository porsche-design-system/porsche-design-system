import type { ContentWrapperWidth } from './content-wrapper-utils';
import { getCss } from '../../utils';
import { getContentWrapperStyle } from './content-wrapper-styles-shared';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';

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
