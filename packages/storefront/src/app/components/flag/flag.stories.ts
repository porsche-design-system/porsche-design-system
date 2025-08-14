'use client';

import { FLAGS_ISO_3166, type FlagName } from '@porsche-design-system/flags';
import type { Story } from '@/models/story';

export const flagStory: Story<'p-flag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flag',
      properties: {
        ...properties,
        aria: { 'aria-label': `Flag of ${FLAGS_ISO_3166[(properties?.name as FlagName) || 'de']}` },
      },
    },
  ],
};
