'use client';

import type { ElementConfig, Story } from '@porsche-design-system/story-generator';

export const tabsBarStoryGradient: Story<'p-tabs-bar'> = {
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
      properties: properties,
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
        ...(new Array(20).fill(null).map((_, index) => ({
          tag: 'button',
          properties: {
            type: 'button',
          },
          children: [`Tab ${index}`],
        })) as ElementConfig<'button'>[]),
      ],
    },
  ],
};
