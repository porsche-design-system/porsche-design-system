'use client';

import type { Story } from '@/models/story';

export const spacingStoryFluid: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'flex flex-col items-start justify-center gap-4 p-4' },
      children: [
        {
          tag: 'div',
          properties: { className: 'p-fluid-xs bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-fluid-xs'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-fluid-sm bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-fluid-sm'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-fluid-md bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-fluid-md'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-fluid-lg bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-fluid-lg'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-fluid-xl bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-fluid-xl'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-fluid-2xl bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-fluid-2xl'],
            },
          ],
        },
      ],
    },
  ],
};

export const spacingStoryStatic: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'flex flex-col items-start justify-center gap-4 p-4' },
      children: [
        {
          tag: 'div',
          properties: { className: 'p-static-xs bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-static-xs'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-static-sm bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-static-sm'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-static-md bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-static-md'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-static-lg bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-static-lg'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-static-xl bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-static-xl'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'p-static-2xl bg-red-100' },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface' },
              children: ['.p-static-2xl'],
            },
          ],
        },
      ],
    },
  ],
};
