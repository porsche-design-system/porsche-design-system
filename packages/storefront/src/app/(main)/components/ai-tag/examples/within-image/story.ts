'use client';

import type { Story } from '@/models/story';

export const aiTagStoryWithImage: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'relative inline-block rounded-lg overflow-hidden' },
      children: [
        {
          tag: 'img',
          properties: {
            src: 'assets/ai-tag-image.jpg',
            alt: 'AI modified image',
            className: 'block w-[300px] h-[300px] object-cover',
          },
        },
        {
          tag: 'p-ai-tag',
          properties: {
            variant: 'modified',
            className: 'absolute bottom-static-sm end-static-sm scheme-dark',
          },
        },
      ],
    },
  ],
};

