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
      size: 'inherit',
      name: 'highway',
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
      className: '[--p-icon-size:48px]',
      name: 'highway',
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
      size: { base: 'small', l: 'xx-large' },
      name: 'highway',
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
      color: 'inherit',
      name: 'highway',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: {
        style: { color: 'light-dark(mediumvioletred, deeppink)' },
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
      className: '[--p-icon-color:deeppink]',
      name: 'highway',
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
