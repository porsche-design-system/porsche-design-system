import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { fontLineHeight, fontSizeTextXSmall, fontWeightSemiBold } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-header-group',
        fontSize: fontSizeTextXSmall,
        lineHeight: fontLineHeight,
        fontWeight: fontWeightSemiBold,
        ...hostHiddenStyles,
      }),
    },
  });
};
