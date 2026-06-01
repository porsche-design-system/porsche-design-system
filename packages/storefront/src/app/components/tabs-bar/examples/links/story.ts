'use client';

import type { Story } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

export const tabsBarStoryLinks: Story<'p-tabs-bar'> = {
  generator: () => [
    {
      tag: 'p-tabs-bar',
      children: [
        ...['Tab One', 'Tab Two', 'Tab Three'].map((tab) => ({
          tag: 'a' as HTMLTagOrComponent,
          properties: {
            href: 'https://porsche.com',
            target: '_blank',
          },
          children: [tab],
        })),
      ],
    },
  ],
};

