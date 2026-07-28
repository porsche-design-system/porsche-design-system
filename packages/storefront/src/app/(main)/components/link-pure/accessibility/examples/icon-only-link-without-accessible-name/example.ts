import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const iconOnlyLinkWithoutAccessibleNameA11yExample = {
  name: 'Icon-only link without accessible name',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-pure',
          properties: { icon: 'arrow-right', href: 'https://porsche.com' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-link-pure',
          properties: { icon: 'arrow-right', hideLabel: true, href: 'https://porsche.com' },
          children: ['Product details'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
