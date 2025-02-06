'use client';

import type { Story } from '@/models/story';
import type { SwitchUpdateEventDetail } from '@porsche-design-system/components-react/ssr';

export const switchStory: Story<'p-switch'> = {
  state: {
    properties: {
      checked: false,
    },
  },
  generator: ({ properties } = {}, updateState = () => {}) => [
    {
      tag: 'p-switch',
      properties: {
        ...properties,
        onUpdate: (e: CustomEvent<SwitchUpdateEventDetail>) => updateState?.('p-switch', 'checked', e.detail.checked),
      },
      children: ['Some label'],
    },
  ],
};
