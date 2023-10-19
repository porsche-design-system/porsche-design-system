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

export const cssVariablePaddingTop = '--p-internal-text-list-padding-top';
export const cssVariablePaddingBottom = '--p-internal-text-list-padding-bottom';
export const cssVariablePseudoSpace = '--p-internal-text-list-pseudo-space';
export const cssVariableUnorderedGridColumn = '--p-internal-text-list-unordered-grid-column';
export const cssVariableUnorderedPseudoContent = '--p-internal-text-list-unordered-pseudo-content';
export const cssVariableOrderedGridColumn = '--p-internal-text-list-ordered-grid-column';
export const cssVariableOrderedPseudoSuffix = '--p-internal-text-list-ordered-pseudo-suffix';
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
        padding: `var(${cssVariablePaddingTop},0) 0 var(${cssVariablePaddingBottom},0) 0`,
        listStyleType: 'none',
        color: getThemedColors(theme).primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: getThemedColors('dark').primaryColor,
        }),
      },
      // css selector for text-list-item
      '::slotted(*)': addImportantToEachRule({
        [cssVariablePaddingTop]: spacingStaticXSmall, // padding top for nested list
        [cssVariablePaddingBottom]: spacingStaticMedium, // padding bottom for nested list, TODO: in case it's last root list item with a nested list it would result in outer spacing which is not desired
        [cssVariablePseudoSpace]: isOrderedList
          ? `var(${cssVariableOrderedGridColumn},1.5rem)`
          : `var(${cssVariableUnorderedGridColumn},.375rem)`,
        '&::before': isOrderedList
          ? {
              content: `counters(${counter},'.',${
                isListTypeNumbered(type) ? 'decimal' : 'lower-latin'
              }) var(${cssVariableOrderedPseudoSuffix},'.')`,
              counterIncrement: counter,
              justifySelf: 'flex-end',
              whiteSpace: 'nowrap',
            }
          : {
              content: `var(${cssVariableUnorderedPseudoContent},'•')`,
            },
      }),
    },
  });
};
