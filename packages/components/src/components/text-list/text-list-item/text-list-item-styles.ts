import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { spacingStaticMedium } from '@porsche-design-system/utilities-v2';
import { cssVariablePseudoSuffix } from '../text-list/text-list-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'list-item',
        position: 'relative', // needed by before pseudo-element, used for ordered list
        font: 'inherit', // ensures style can't be overwritten from outside
        color: 'inherit', // ensures style can't be overwritten from outside
        listStyleType: 'inherit', // ensures style can't be overwritten from outside
        paddingLeft: spacingStaticMedium, // space between ::marker/::before and list item
        ...hostHiddenStyles,
      }),
      '::slotted(*)': {
        [cssVariablePseudoSuffix]: '""', // don't show suffix "." for nested ordered list
      },
    },
  });
};
