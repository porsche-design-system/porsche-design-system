'use client';

import type { HTMLTagOrComponent } from '@/components/playground/ConfiguratorControls';
import type { Story } from '@/models/story';
import type { TabsBarUpdateEventDetail } from '@porsche-design-system/components-react/ssr';

export const tabsBarStory: Story<'p-tabs-bar'> = {
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
