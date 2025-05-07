'use client';

import type { Story } from '@/models/story';

export const typographyStoryDisplay: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md',
      },
      children: [
        {
          tag: 'h3',
          properties: { className: 'pds-display-lg text-primary' },
          children: ['.pds-display-lg'],
        },
        {
          tag: 'h3',
          properties: { className: 'pds-display-md text-primary' },
          children: ['.pds-display-md'],
        },
        {
          tag: 'h3',
          properties: { className: 'pds-display-sm text-primary' },
          children: ['.pds-display-sm'],
        },
      ],
    },
  ],
};

export const typographyStoryHeading: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md',
      },
      children: [
        {
          tag: 'h3',
          properties: { className: 'pds-heading-2xl text-primary' },
          children: ['.pds-heading-2xl'],
        },
        {
          tag: 'h3',
          properties: { className: 'pds-heading-xl text-primary' },
          children: ['.pds-heading-xl'],
        },
        {
          tag: 'h3',
          properties: { className: 'pds-heading-lg text-primary' },
          children: ['.pds-heading-lg'],
        },
        {
          tag: 'h3',
          properties: { className: 'pds-heading-md text-primary' },
          children: ['.pds-heading-md'],
        },
        {
          tag: 'h3',
          properties: { className: 'pds-heading-sm text-primary' },
          children: ['.pds-heading-sm'],
        },
      ],
    },
  ],
};

export const typographyStoryText: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md',
      },
      children: [
        {
          tag: 'p',
          properties: { className: 'pds-text-xl text-primary hyphens-auto' },
          children: ['.pds-text-xl'],
        },
        {
          tag: 'p',
          properties: { className: 'pds-text-lg text-primary hyphens-auto' },
          children: ['.pds-text-lg'],
        },
        {
          tag: 'p',
          properties: { className: 'pds-text-md text-primary hyphens-auto' },
          children: ['.pds-text-md'],
        },
        {
          tag: 'p',
          properties: { className: 'pds-text-sm text-primary hyphens-auto' },
          children: ['.pds-text-sm'],
        },
        {
          tag: 'p',
          properties: { className: 'pds-text-xs text-primary hyphens-auto' },
          children: ['.pds-text-xs'],
        },
        {
          tag: 'p',
          properties: { className: 'pds-text-2xs text-primary hyphens-auto' },
          children: ['.pds-text-2xs'],
        },
      ],
    },
  ],
};
