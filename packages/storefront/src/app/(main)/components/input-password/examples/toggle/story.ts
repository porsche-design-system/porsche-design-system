'use client';

import type { Story } from '@/models/story';

export const inputPasswordStoryToggle: Story<'p-input-password'> = {
  generator: () => [
    {
      tag: 'p-input-password',
      properties: { label: 'Some label', name: 'some-name', toggle: true },
    },
  ],
};

