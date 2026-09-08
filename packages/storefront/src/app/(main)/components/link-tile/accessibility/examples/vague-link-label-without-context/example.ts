import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const vagueLinkLabelWithoutContextA11yExample = {
  name: 'Vague link label without context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-tile',
          properties: { label: 'Details', href: '#' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-tile',
          properties: { label: 'Porsche Taycan details', href: '#' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
