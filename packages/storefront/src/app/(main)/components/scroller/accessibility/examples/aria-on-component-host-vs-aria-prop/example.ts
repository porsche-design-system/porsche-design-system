import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-scroller',
          properties: { 'aria-label': 'Section tags', 'aria-description': 'Section tags for the section overview' },
          children: [
            {
              tag: 'p-tag',
              children: ['Overview'],
            },
            {
              tag: 'p-tag',
              children: ['Equipment'],
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
          tag: 'p-scroller',
          properties: {
            aria: { 'aria-label': 'Section tags', 'aria-description': 'Section tags for the section overview' },
          },
          children: [
            {
              tag: 'p-tag',
              children: ['Overview'],
            },
            {
              tag: 'p-tag',
              children: ['Equipment'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
