'use client';

import type { Story } from '@/models/story';
import { ICONS_MANIFEST } from '@porsche-design-system/assets';
import type { PIconProps } from '@porsche-design-system/components-react/ssr';
import { capitalCase } from 'change-case';

export const iconStory: Story<'p-icon'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};

export const iconStoryOverview: Story<'p-icon'> = {
  generator: () =>
    Object.keys(ICONS_MANIFEST).map((icon) => ({
      tag: 'p-icon',
      properties: { name: icon as PIconProps['name'], aria: { 'aria-label': `${capitalCase(icon)} icon` } },
    })),
};

export const iconStoryCustom: Story<'p-icon'> = {
  state: {
    properties: {
      source: 'assets/icon-custom-kaixin.svg',
      aria: { 'aria-label': 'Icon for social media platform Kaixin' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};
