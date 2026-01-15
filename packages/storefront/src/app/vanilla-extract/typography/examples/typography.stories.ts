'use client';

import type { Story } from '@/models/story';

export const typographyVanillaExtractStoryDisplay: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md',
      },
      children: [
        {
          tag: 'h3',
          properties: { className: 'prose-display-lg' },
          children: ['...displayLargeStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-display-md' },
          children: ['...displayMediumStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-display-sm' },
          children: ['...displaySmallStyle'],
        },
      ],
    },
  ],
};

export const typographyVanillaExtractStoryHeading: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md',
      },
      children: [
        {
          tag: 'h3',
          properties: { className: 'prose-heading-2xl' },
          children: ['...headingXXLargeStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-xl' },
          children: ['...headingXLargeStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-lg' },
          children: ['...headingLargeStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-md' },
          children: ['...headingMediumStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-sm' },
          children: ['...headingSmallStyle'],
        },
      ],
    },
  ],
};

export const typographyVanillaExtractStoryText: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md',
      },
      children: [
        {
          tag: 'p',
          properties: { className: 'prose-text-xl hyphens-auto' },
          children: ['...textXLargeStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-lg hyphens-auto' },
          children: ['...textLargeStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-md hyphens-auto' },
          children: ['...textMediumStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-sm hyphens-auto' },
          children: ['...textSmallStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-xs hyphens-auto' },
          children: ['...textXSmallStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-2xs hyphens-auto' },
          children: ['...textXXSmallStyle'],
        },
      ],
    },
  ],
};
