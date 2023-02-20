import type { ListType, OrderType } from './text-list-utils';
import { isListTypeOrdered, isOrderTypeNumbered } from './text-list-utils';
import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors, hostHiddenStyles } from '../../../styles';
import { spacingStaticMedium, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';

export const cssVariablePseudoSuffix = '--p-internal-text-list-pseudo-suffix';
const cssVariablePaddingTop = '--p-internal-text-list-padding-top';
const cssVariablePaddingBottom = '--p-internal-text-list-padding-bottom';
const cssVariableUnorderedPaddingLeft = '--p-internal-text-list-unordered-padding-left';
const cssVariableOrderedPaddingLeft = '--p-internal-text-list-ordered-padding-left';
const cssVariableListStyleType = '--p-internal-text-list-list-style-type';
const counter = 'p-text-list-counter';

export const getComponentCss = (listType: ListType, orderType: OrderType, theme: Theme): string => {
  const isOrderedList = isListTypeOrdered(listType);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          counterReset: counter,
          ...hostHiddenStyles,
        }),
      },
      'ol,ul': {
        ...textSmallStyle,
        color: getThemedColors(theme).primaryColor,
        margin: 0,
        padding: `var(${cssVariablePaddingTop},0) 0 var(${cssVariablePaddingBottom},0) ${
          isOrderedList
            ? `var(${cssVariableOrderedPaddingLeft},1.5rem)` // reserves space for ::before (root ordered list)
            : `var(${cssVariableUnorderedPaddingLeft},.375rem)` // reserves space for ::marker "•" (root unordered list)
        }`,
        listStyleType: isOrderedList ? 'none' : `var(${cssVariableListStyleType},'•')`, // custom ::marker char for root unordered list
      },
      '::slotted(*)': {
        [cssVariablePaddingTop]: spacingStaticXSmall, // padding top for nested list
        [cssVariablePaddingBottom]: spacingStaticMedium, // padding bottom for nested list
        [cssVariableOrderedPaddingLeft]: '2rem', // reserves space for ::before (nested ordered list)
        [cssVariableUnorderedPaddingLeft]: '.625rem', // reserves space for ::marker "–" (nested unordered list)
        [cssVariableListStyleType]: '"–"', // custom ::marker char for nested unordered list
      },
      ...(isOrderedList && {
        '::slotted([role="listitem"])::before': {
          content: `counters(${counter},'.',${
            isOrderTypeNumbered(orderType) ? 'decimal' : 'lower-latin'
          }) var(${cssVariablePseudoSuffix},'.')`,
          counterIncrement: counter,
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(-100%,0)',
        },
      }),
    },
  });
};
