import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { fontLineHeight, fontSizeTextXSmall, fontWeightSemiBold } from '@porsche-design-system/styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'table-header-group',
        ...addImportantToEachRule({
          fontSize: fontSizeTextXSmall,
          lineHeight: fontLineHeight,
          fontWeight: fontWeightSemiBold,
          ...hostHiddenStyles,
        }),
      },
    },
  });
};
