import {
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  spacingStaticMd,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { getCss } from '../../../utils';
import { isListTypeNumbered, isListTypeOrdered, type TextListType } from './text-list-utils';

export const cssVariableOrderedGridColumn = '--_p-text-list-a';
export const cssVariableOrderedPseudoSuffix = '--_p-text-list-b';
export const cssVariablePaddingBottom = '--_p-text-list-c';
export const cssVariablePaddingTop = '--_p-text-list-d';
export const cssVariablePseudoSpace = '--_p-text-list-e';
export const cssVariableUnorderedGridColumn = '--_p-text-list-f';
export const cssVariableUnorderedPseudoContent = '--_p-text-list-g';
const counter = 'p-text-list-counter';

export const getComponentCss = (type: TextListType): string => {
  const isOrderedList = isListTypeOrdered(type);

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
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        margin: 0,
        padding: `${ref(cssVariablePaddingTop, '0')} 0 ${ref(cssVariablePaddingBottom, '0')} 0`,
        listStyleType: 'none',
        color: ref(colorPrimary),
      },
      // css selector for text-list-item
      '::slotted(*)': addImportantToEachRule({
        [cssVariablePaddingTop]: ref(spacingStaticXs), // padding top for nested list
        [cssVariablePaddingBottom]: ref(spacingStaticMd), // padding bottom for nested list, TODO: in case it's last root list item with a nested list it would result in outer spacing which is not desired
        [cssVariablePseudoSpace]: isOrderedList
          ? ref(cssVariableOrderedGridColumn, '1.5rem')
          : ref(cssVariableUnorderedGridColumn, '.375rem'),
        '&::before': isOrderedList
          ? {
              content: `counters(${counter},'.',${
                isListTypeNumbered(type) ? 'decimal' : 'lower-latin'
              }) ${ref(cssVariableOrderedPseudoSuffix, "'.'")}`,
              counterIncrement: counter,
              justifySelf: 'flex-end',
              whiteSpace: 'nowrap',
            }
          : {
              content: ref(cssVariableUnorderedPseudoContent, "'•'"),
            },
      }),
    },
  });
};
