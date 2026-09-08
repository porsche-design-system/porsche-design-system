import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const headingTagUsedForStylingOnlyA11yExample = {
  name: 'Heading tag used for styling only',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-text',
          properties: { tag: 'p', size: 'lg', weight: 'bold' },
          children: ['Delivery options'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-heading',
          properties: { tag: 'h2', size: 'lg' },
          children: ['Delivery options'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
