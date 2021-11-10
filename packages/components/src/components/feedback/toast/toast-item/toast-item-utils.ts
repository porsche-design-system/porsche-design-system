import { AriaAttributes } from 'react';

export const getContentAriaAttributes = (descriptionId: string): AriaAttributes & { role: string } => {
  return {
    role: 'status',
    'aria-live': 'polite',
    'aria-describedby': descriptionId,
  };
};
