'use client';

import type { Story } from '@/models/story';

export const typographyScssStoryDisplay: Story<'div'> = {
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
          children: ['@include pds-display-large;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-display-md' },
          children: ['@include pds-display-medium;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-display-sm' },
          children: ['@include pds-display-small;'],
        },
      ],
    },
  ],
};

export const typographyScssStoryHeading: Story<'div'> = {
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
          children: ['@include pds-heading-xx-large;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-xl' },
          children: ['@include pds-heading-x-large;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-lg' },
          children: ['@include pds-heading-large;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-md' },
          children: ['@include pds-heading-medium;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-sm' },
          children: ['@include pds-heading-small;'],
        },
      ],
    },
  ],
};

export const typographyScssStoryText: Story<'div'> = {
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
          children: ['@include pds-text-x-large;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-lg hyphens-auto' },
          children: ['@include pds-text-large;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-md hyphens-auto' },
          children: ['@include pds-text-medium;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-sm hyphens-auto' },
          children: ['@include pds-text-small;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-xs hyphens-auto' },
          children: ['@include pds-text-x-small;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-2xs hyphens-auto' },
          children: ['@include pds-text-xx-small;'],
        },
      ],
    },
  ],
};
