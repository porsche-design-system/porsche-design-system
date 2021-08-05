import type { AriaAttributes } from 'react';
import { attachCss, booleanToString } from '../../../../utils';
import type { FormState, Theme } from '../../../../types';
import { getComponentCss } from './select-wrapper-filter-styles';

export const getAriaAttributes = (isOpen: boolean, dropdownId: string, activeDescendantId: number): AriaAttributes => {
  return {
    'aria-autocomplete': 'both',
    'aria-controls': dropdownId,
    'aria-expanded': booleanToString(isOpen),
    'aria-activedescendant': `option-${activeDescendantId}`,
  };
};

export const addComponentCss = (host: HTMLElement, disabled: boolean, state: FormState, theme: Theme): void => {
  attachCss(host, getComponentCss(disabled, state, theme));
};
