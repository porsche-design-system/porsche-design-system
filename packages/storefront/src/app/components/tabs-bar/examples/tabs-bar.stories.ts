'use client';

import type { Story } from '@/models/story';
import type { TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';

export const tabsBarStory: Story = {
  state: {
    properties: {
      activeTabIndex: 0,
    },
  },
  generator: ({ properties } = {}, updateState = () => {}) => [
    {
      tag: 'p-tabs-bar',
      properties: {
        ...properties,
        onUpdate: (e: CustomEvent<TabsBarUpdateEventDetail>) =>
          updateState?.('p-link-tile-product', 'activeTabIndex', e.detail.activeTabIndex),
      },
      children: [
        ...['Tab One', 'Tab Two', 'Tab Three'].map((tab) => ({
          tag: 'button',
          properties: {
            type: 'button',
          },
          children: [tab],
        })),
      ],
    },
  ],
};
