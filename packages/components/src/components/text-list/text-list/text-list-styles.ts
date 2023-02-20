import type { ListType } from './text-list-utils';
import type { OrderType } from './text-list-utils';
import type { Theme } from '../../../types';
import { isListTypeOrdered, isOrderTypeNumbered } from './text-list-utils';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors, hostHiddenStyles } from '../../../styles';
import { spacingStaticMedium, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';

const cssVariablePaddingTop = '--p-internal-text-list-padding-top';
const cssVariablePaddingBottom = '--p-internal-text-list-padding-bottom';
const cssVariablePaddingLeft = '--p-internal-text-list-padding-left';
const cssVariableListStyleType = '--p-internal-text-list-list-style-type';

export const getComponentCss = (listType: ListType, orderType: OrderType, theme: Theme): string => {
  const isOrderedList = isListTypeOrdered(listType);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      'ol,ul': {
        ...textSmallStyle,
        color: getThemedColors(theme).primaryColor,
        margin: 0,
        padding: `var(${cssVariablePaddingTop},0) 0 var(${cssVariablePaddingBottom},0) ${
          isOrderedList ? '1.5rem' : `var(${cssVariablePaddingLeft},.375rem)` // reserves space for ::marker
        }`,
        listStyleType: isOrderedList
          ? isOrderTypeNumbered(orderType)
            ? 'decimal'
            : 'lower-latin'
          : `var(${cssVariableListStyleType},'•')`,
      },
      '::slotted(*)': {
        [cssVariablePaddingTop]: spacingStaticXSmall, // padding top for nested list
        [cssVariablePaddingBottom]: spacingStaticMedium, // padding bottom for nested list
        [cssVariablePaddingLeft]: '.625rem', // reserves space for char "–" (unordered list)
        [cssVariableListStyleType]: '"–"', // char "–" for nested unordered list
      },
    },
  });
};
