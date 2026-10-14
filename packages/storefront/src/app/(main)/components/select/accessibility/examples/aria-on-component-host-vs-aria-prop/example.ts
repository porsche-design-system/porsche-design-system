import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: {
            name: 'model',
            label: 'Porsche model',
            'aria-label': 'Accessible name',
            'aria-description': 'Additional context',
          },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: 'option-a' },
              children: ['Option A'],
            },
          ],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-select',
          properties: {
            name: 'model',
            label: 'Porsche model',
            aria: { 'aria-label': 'Accessible name', 'aria-description': 'Additional context' },
          },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: 'option-a' },
              children: ['Option A'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
