import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const popoverA11yExamples: A11yIntegrationExample[] = [
  {
    title: 'ARIA on component host vs aria prop',
    anti: {
      generator: () => [
        {
          tag: 'p-popover',
          properties: { 'aria-label': 'Specification details', description: 'Additional specification details.' },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: 'p-popover',
          properties: {
            aria: { 'aria-label': 'Specification details' },
            description: 'Additional specification details.',
          },
        },
      ],
    },
  },
  {
    title: 'Custom slotted trigger without accessible name',
    anti: {
      generator: () => [
        {
          tag: 'p-popover',
          children: [
            {
              tag: 'button',
              properties: { slot: 'button', type: 'button' },
            },
            'Additional specification details.',
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: 'p-popover',
          properties: { description: 'Additional specification details.' },
        },
        '// or provide an accessible name on a custom slotted button',
        {
          tag: 'p-popover',
          children: [
            {
              tag: 'button',
              properties: { slot: 'button', type: 'button', ariaLabel: 'Specification details' },
              children: ['i'],
            },
            'Additional specification details.',
          ],
        },
      ],
    },
  },
  {
    title: 'Custom slotted trigger without aria-expanded',
    anti: {
      generator: () => [
        {
          tag: 'p-popover',
          children: [
            {
              tag: 'button',
              properties: { slot: 'button', type: 'button' },
            },
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: 'p-popover',
          children: [
            {
              tag: 'button',
              properties: { slot: 'button', type: 'button', ariaExpanded: 'false' },
            },
          ],
        },
      ],
    },
  },
];
