'use client';

import type { Story } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

export const tabsBarStoryLinks: Story<'p-tabs-bar'> = {
  generator: () => [
    {
      tag: 'p-tabs-bar',
      children: [
        ...['Page One', 'Page Two', 'Page Three'].map((page, index) => ({
          tag: 'a' as HTMLTagOrComponent,
          properties: {
            href: `https://porsche.com/page-${index + 1}`,
          },
          children: [page],
        })),
      ],
    },
  ],
};
