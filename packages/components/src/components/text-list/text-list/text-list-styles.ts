import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import {
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  spacingStaticMd,
  spacingStaticXs,
  typescaleSm,
} from '../../../styles/css-variables';
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
        font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        margin: 0,
        padding: `var(${cssVariablePaddingTop},0) 0 var(${cssVariablePaddingBottom},0) 0`,
        listStyleType: 'none',
        color: colorPrimary,
      },
      // css selector for text-list-item
      '::slotted(*)': addImportantToEachRule({
        [cssVariablePaddingTop]: spacingStaticXs, // padding top for nested list
        [cssVariablePaddingBottom]: spacingStaticMd, // padding bottom for nested list, TODO: in case it's last root list item with a nested list it would result in outer spacing which is not desired
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
