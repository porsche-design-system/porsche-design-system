import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const genericStepLabelsWithoutContextA11yExample = {
  name: 'Generic step labels without context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-stepper-horizontal',
          children: [
            {
              tag: 'p-stepper-horizontal-item',
              properties: { state: 'complete' },
              children: ['Step 1'],
            },
            {
              tag: 'p-stepper-horizontal-item',
              properties: { state: 'current' },
              children: ['Step 2'],
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
          tag: 'p-stepper-horizontal',
          children: [
            {
              tag: 'p-stepper-horizontal-item',
              properties: { state: 'complete' },
              children: ['Configure vehicle'],
            },
            {
              tag: 'p-stepper-horizontal-item',
              properties: { state: 'current' },
              children: ['Choose delivery date'],
            },
            {
              tag: 'p-stepper-horizontal-item',
              children: ['Review and confirm'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
