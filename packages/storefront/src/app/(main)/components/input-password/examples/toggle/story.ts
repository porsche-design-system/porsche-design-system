'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const inputPasswordStoryToggle: Story<'p-input-password'> = {
  generator: () => [
    {
      tag: 'p-input-password',
      properties: { label: 'Some label', name: 'some-name', toggle: true },
    },
  ],
};

