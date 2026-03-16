'use client';

import { ICONS_MANIFEST } from '@porsche-design-system/assets';
import type { PIconProps } from '@porsche-design-system/components-react/ssr';
import { capitalCase } from 'change-case';
import type { Story } from '@/models/story';

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

export const iconStorySize: Story<'p-icon'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      name: 'highway',
      size: 'inherit',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: { className: 'text-[48px]', size: 'inherit' },
      children: [
        {
          tag: 'p-icon',
          properties,
        },
        'Some text',
      ],
    },
  ],
};

export const iconStorySizeCSSVar: Story<'p-icon'> = {
  state: {
    properties: {
      name: 'highway',
      className: '[--p-icon-size:48px]',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};

export const iconStoryResponsiveSize: Story<'p-icon'> = {
  state: {
    properties: {
      name: 'highway',
      size: { base: 'small', l: 'xx-large' },
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};

export const iconStoryColor: Story<'p-icon'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      name: 'highway',
      color: 'inherit',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: {
        className: 'text-[deeppink]',
        color: 'inherit',
      },
      children: [
        {
          tag: 'p-icon',
          properties,
        },
        'Some text',
      ],
    },
  ],
};

export const iconStoryColorCSSVar: Story<'p-icon'> = {
  state: {
    properties: {
      name: 'highway',
      className: '[--p-icon-color:deeppink]',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
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
