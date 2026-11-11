'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const headingStoryCustomColor: Story<'p-heading'> = {
  generator: () => [
    {
      tag: 'p-heading',
      properties: { tag: 'h3', color: 'inherit', className: 'text-[deeppink]' },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

