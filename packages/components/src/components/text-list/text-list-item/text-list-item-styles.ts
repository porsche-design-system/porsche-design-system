import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { spacingStaticMedium } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'list-item',
        font: 'inherit', // ensures style can't be overwritten from outside
        color: 'inherit', // ensures style can't be overwritten from outside
        listStyleType: 'inherit', // ensures style can't be overwritten from outside
        paddingLeft: spacingStaticMedium, // space between ::marker and list item
        ...hostHiddenStyles,
      }),
    },
  });
};
