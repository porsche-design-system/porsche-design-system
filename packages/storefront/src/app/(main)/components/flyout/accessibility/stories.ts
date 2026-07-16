import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const flyoutA11yExamples: A11yIntegrationExample[] = [
  {
    title: 'ARIA on trigger button host vs aria prop',
    anti: {
      generator: () => [
        {
          tag: 'p-button',
          properties: { 'aria-haspopup': 'dialog' },
          children: ['Open dialog'],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: 'p-button',
          properties: { aria: { 'aria-haspopup': 'dialog' } },
          children: ['Open dialog'],
        },
      ],
    },
  },
  {
    title: 'Dialog label on component host vs header slot',
    anti: {
      generator: () => [
        {
          tag: 'p-flyout',
          properties: { 'aria-label': 'Navigation' },
          children: ['...'],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: 'p-flyout',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Main navigation'],
            },
            '...',
          ],
        },
        '// or with aria prop when no visible header is shown',
        {
          tag: 'p-flyout',
          properties: { aria: { 'aria-label': 'Main navigation' } },
          children: ['...'],
        },
      ],
    },
  },
  {
    title: 'Flyout trigger without popup semantics',
    anti: {
      generator: () => [
        {
          tag: 'p-button',
          children: ['Open dialog'],
        },
        {
          tag: 'p-flyout',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Dialog heading'],
            },
            '...',
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: 'p-button',
          properties: { aria: { 'aria-haspopup': 'dialog' } },
          children: ['Open dialog'],
        },
        {
          tag: 'p-flyout',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'header', tag: 'h2', size: 'lg' },
              children: ['Dialog heading'],
            },
            '...',
          ],
        },
      ],
    },
  },
];
