import type { AriaAttributes } from 'react';
import { booleanToString } from '../../../../utils';

export const getAriaAttributes = (isOpen: boolean, dropdownId: string, activeDescendantId): AriaAttributes => {
  return {
    'aria-autocomplete': 'both',
    'aria-controls': dropdownId,
    'aria-expanded': booleanToString(isOpen),
    'aria-activedescendant': `option-${activeDescendantId}`,
  };
};
