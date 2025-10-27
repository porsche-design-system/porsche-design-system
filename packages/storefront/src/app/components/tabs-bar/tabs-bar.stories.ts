'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const tabsBarStory: Story<'p-tabs-bar'> = {
  state: {
    properties: {
      activeTabIndex: 0,
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

export const tabsBarStoryGradient: Story<'p-tabs-bar'> = {
  state: {
    properties: {
      activeTabIndex: 0,
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
