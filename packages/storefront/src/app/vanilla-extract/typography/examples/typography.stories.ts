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
          children: ['...proseDisplayLgStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-display-md' },
          children: ['...proseDisplayMdStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-display-sm' },
          children: ['...proseDisplaySmStyle'],
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
          children: ['...proseHeading2XlStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-xl' },
          children: ['...proseHeadingXlStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-lg' },
          children: ['...proseHeadingLgStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-md' },
          children: ['...proseHeadingMdStyle'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-sm' },
          children: ['...proseHeadingSmStyle'],
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
          children: ['...proseTextXlStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-lg hyphens-auto' },
          children: ['...proseTextLgStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-md hyphens-auto' },
          children: ['...proseTextMdStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-sm hyphens-auto' },
          children: ['...proseTextSmStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-xs hyphens-auto' },
          children: ['...proseTextXsStyle'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-2xs hyphens-auto' },
          children: ['...proseText2XsStyle'],
        },
      ],
    },
  ],
};
