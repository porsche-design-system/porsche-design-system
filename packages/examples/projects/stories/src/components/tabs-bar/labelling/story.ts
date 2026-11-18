'use client';

import type { HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

export const tabsBarStoryLabelling: Story<'p-tabs-bar'> = {
  state: {
    properties: {
      activeTabIndex: 0,
      aria: {
        'aria-label': 'Some label for the tablist',
        'aria-description': 'Some description for the tablist',
      },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tabs-bar',
      properties,
      events: {
        // @ts-expect-error
        onUpdate: {
          target: 'p-tabs-bar',
          prop: 'activeTabIndex',
          eventValueKey: 'activeTabIndex',
          eventType: 'TabsBarUpdateEventDetail',
        },
      },
      children: [
        ...['Tab One', 'Tab Two', 'Tab Three'].map((tab) => ({
          tag: 'button' as HTMLTagOrComponent,
          properties: {
            type: 'button',
          },
          children: [tab],
        })),
      ],
    },
  ],
};
