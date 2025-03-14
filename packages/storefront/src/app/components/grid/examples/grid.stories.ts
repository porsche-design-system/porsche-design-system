'use client';

import type { Story } from '@/models/story';

export const gridStory: Story<'p-grid'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-grid',
      properties,
      children: [{ tag: 'p-grid-item', properties: { size: 12 }, children: ['12'] }],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 1 }, children: ['1'] },
        { tag: 'p-grid-item', properties: { size: 11 }, children: ['11'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 2 }, children: ['2'] },
        { tag: 'p-grid-item', properties: { size: 10 }, children: ['10'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 3 }, children: ['3'] },
        { tag: 'p-grid-item', properties: { size: 9 }, children: ['9'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 4 }, children: ['4'] },
        { tag: 'p-grid-item', properties: { size: 8 }, children: ['8'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 5 }, children: ['5'] },
        { tag: 'p-grid-item', properties: { size: 7 }, children: ['7'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 6 }, children: ['6'] },
        { tag: 'p-grid-item', properties: { size: 6 }, children: ['6'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 7 }, children: ['7'] },
        { tag: 'p-grid-item', properties: { size: 5 }, children: ['5'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 8 }, children: ['8'] },
        { tag: 'p-grid-item', properties: { size: 4 }, children: ['4'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 9 }, children: ['9'] },
        { tag: 'p-grid-item', properties: { size: 3 }, children: ['3'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 10 }, children: ['10'] },
        { tag: 'p-grid-item', properties: { size: 2 }, children: ['2'] },
      ],
    },
    {
      tag: 'p-grid',
      children: [
        { tag: 'p-grid-item', properties: { size: 11 }, children: ['11'] },
        { tag: 'p-grid-item', properties: { size: 1 }, children: ['1'] },
      ],
    },
    {
      tag: 'style',
      children: [
        `p-grid {
    margin-top: 8px;
  }
        p-grid-item {
    color: #010205;
    text-align: center;
    background: #87cefa;
    background-clip: content-box;
  }`,
      ],
    },
  ],
};
