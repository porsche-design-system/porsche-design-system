import type { TextListType } from './text-list-utils';
import type { Theme } from '../../../types';
import { isListTypeOrdered, isListTypeNumbered } from './text-list-utils';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { spacingStaticMedium, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';

export const cssVariablePseudoSuffix = '--p-internal-text-list-pseudo-suffix';
const cssVariablePaddingTop = '--p-internal-text-list-padding-top';
const cssVariablePaddingBottom = '--p-internal-text-list-padding-bottom';
const cssVariableUnorderedPaddingLeft = '--p-internal-text-list-unordered-padding-left';
const cssVariableOrderedPaddingLeft = '--p-internal-text-list-ordered-padding-left';
const cssVariableListStyleType = '--p-internal-text-list-list-style-type';
const counter = 'p-text-list-counter';

export const getComponentCss = (type: TextListType, theme: Theme): string => {
  const isOrderedList = isListTypeOrdered(type);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          counterReset: counter,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      'ol,ul': {
        ...textSmallStyle,
        margin: 0,
        padding: `var(${cssVariablePaddingTop},0) 0 var(${cssVariablePaddingBottom},0) ${
          isOrderedList
            ? `var(${cssVariableOrderedPaddingLeft},1.5rem)` // reserves space for ::before (root ordered list)
            : `var(${cssVariableUnorderedPaddingLeft},.375rem)` // reserves space for ::marker "•" (root unordered list)
        }`,
        listStyleType: isOrderedList ? 'none' : `var(${cssVariableListStyleType},'•')`, // custom ::marker char for root unordered list
        color: getThemedColors(theme).primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: getThemedColors('dark').primaryColor,
        }),
      },
      // css selector for text-list-item
      '::slotted(*)': addImportantToEachRule({
        [cssVariablePaddingTop]: spacingStaticXSmall, // padding top for nested list
        // TODO: in case it's last root list item with a nested list it would result in outer spacing which is not desired
        [cssVariablePaddingBottom]: spacingStaticMedium, // padding bottom for nested list
        [cssVariableOrderedPaddingLeft]: '2rem', // reserves space for ::before (nested ordered list)
        [cssVariableUnorderedPaddingLeft]: '.625rem', // reserves space for ::marker "–" (nested unordered list)
        [cssVariableListStyleType]: '"–"', // custom ::marker char for nested unordered list
        ...(isOrderedList && {
          '&::before': {
            content: `counters(${counter},'.',${
              isListTypeNumbered(type) ? 'decimal' : 'lower-latin'
            }) var(${cssVariablePseudoSuffix},'.')`,
            counterIncrement: counter,
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translate(-100%,0)',
          },
        }),
      }),
    },
  });
};
