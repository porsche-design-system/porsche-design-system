import { spacingStaticMedium } from '@porsche-design-system/emotion';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { getCss } from '../../../utils';
import {
  cssVariableOrderedGridColumn,
  cssVariableOrderedPseudoSuffix,
  cssVariablePseudoSpace,
  cssVariableUnorderedGridColumn,
  cssVariableUnorderedPseudoContent,
} from '../text-list/text-list-styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          gridTemplateColumns: `var(${cssVariablePseudoSpace}) 1fr`,
          columnGap: spacingStaticMedium,
          font: 'inherit', // ensures style can't be overwritten from outside
          color: 'inherit', // ensures style can't be overwritten from outside
          ...hostHiddenStyles,
        }),
      },
      slot: {
        display: 'inline',
      },
      ...addImportantToEachRule({
        '::slotted(*)': {
          [cssVariableUnorderedGridColumn]: '.625rem', // reserves space for ::before (nested unordered list)
          [cssVariableUnorderedPseudoContent]: '"–"', // custom ::before char "–" (nested unordered list)
          [cssVariableOrderedGridColumn]: '2rem', // reserves space for ::before (nested ordered list)
          [cssVariableOrderedPseudoSuffix]: '""', // don't show ::before suffix "." (nested ordered list)
        },
        '::slotted(*:last-child)': {
          gridColumn: 2,
        },
      }),
    },
  });
};
