'use client';

import type { Story } from '@/models/story';

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
          properties: { className: 'prose-heading-5xl' },
          children: ['@include prose-heading-5xl;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-4xl' },
          children: ['@include prose-heading-4xl;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-3xl' },
          children: ['@include prose-heading-3xl;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-2xl' },
          children: ['@include prose-heading-2xl;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-xl' },
          children: ['@include prose-heading-xl;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-lg' },
          children: ['@include prose-heading-lg;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-md' },
          children: ['@include prose-heading-md;'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-sm' },
          children: ['@include prose-heading-sm;'],
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
          children: ['@include prose-text-xl;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-lg hyphens-auto' },
          children: ['@include prose-text-lg;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-md hyphens-auto' },
          children: ['@include prose-text-md;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-sm hyphens-auto' },
          children: ['@include prose-text-sm;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-xs hyphens-auto' },
          children: ['@include prose-text-xs;'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-2xs hyphens-auto' },
          children: ['@include prose-text-2xs;'],
        },
      ],
    },
  ],
};
