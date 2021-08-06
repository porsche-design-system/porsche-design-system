import type { AriaAttributes } from 'react';

export const getAriaAttributes = (isOpen: boolean, dropdownId: string, activeDescendantId: number): AriaAttributes => {
  return {
    'aria-autocomplete': 'both',
    'aria-controls': dropdownId,
    'aria-expanded': isOpen ? 'true' : 'false',
    'aria-activedescendant': `option-${activeDescendantId}`,
  };
};
