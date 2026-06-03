'use client';

import type { Story } from '@/models/story';

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
          properties: { className: 'prose-heading-5xl' },
          children: ['.prose-heading-5xl'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-4xl' },
          children: ['.prose-heading-4xl'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-3xl' },
          children: ['.prose-heading-3xl'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-2xl' },
          children: ['.prose-heading-2xl'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-xl' },
          children: ['.prose-heading-xl'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-lg' },
          children: ['.prose-heading-lg'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-md' },
          children: ['.prose-heading-md'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-sm' },
          children: ['.prose-heading-sm'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-xs' },
          children: ['.prose-heading-xs'],
        },
        {
          tag: 'h3',
          properties: { className: 'prose-heading-2xs' },
          children: ['.prose-heading-2xs'],
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
          properties: { className: 'prose-text-5xl hyphens-auto' },
          children: ['.prose-text-5xl'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-4xl hyphens-auto' },
          children: ['.prose-text-4xl'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-3xl hyphens-auto' },
          children: ['.prose-text-3xl'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-2xl hyphens-auto' },
          children: ['.prose-text-2xl'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-xl hyphens-auto' },
          children: ['.prose-text-xl'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-lg hyphens-auto' },
          children: ['.prose-text-lg'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-md hyphens-auto' },
          children: ['.prose-text-md'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-sm hyphens-auto' },
          children: ['.prose-text-sm'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-xs hyphens-auto' },
          children: ['.prose-text-xs'],
        },
        {
          tag: 'p',
          properties: { className: 'prose-text-2xs hyphens-auto' },
          children: ['.prose-text-2xs'],
        },
      ],
    },
  ],
};
