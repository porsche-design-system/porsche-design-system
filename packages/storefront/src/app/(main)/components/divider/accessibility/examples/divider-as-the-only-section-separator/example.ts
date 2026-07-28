import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const dividerAsTheOnlySectionSeparatorA11yExample = {
  name: 'Divider as the only section separator',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-text',
          children: ['Delivery details'],
        },
        {
          tag: 'p-divider',
        },
        {
          tag: 'p-text',
          children: ['Payment details'],
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
          properties: { tag: 'h2', size: 'md' },
          children: ['Delivery details'],
        },
        {
          tag: 'p-text',
          children: ['...'],
        },
        {
          tag: 'p-divider',
        },
        {
          tag: 'p-heading',
          properties: { tag: 'h2', size: 'md' },
          children: ['Payment details'],
        },
        {
          tag: 'p-text',
          children: ['...'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
