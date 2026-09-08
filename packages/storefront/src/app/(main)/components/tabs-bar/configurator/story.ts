'use client';

import type { Story } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

const tabsBarAria = {
  'aria-label': 'Some label for the tablist',
  'aria-description': 'Some description for the tablist',
};

export const tabsBarStory: Story<'p-tabs-bar'> = {
  state: {
    properties: {
      activeTabIndex: 0,
      aria: tabsBarAria,
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
