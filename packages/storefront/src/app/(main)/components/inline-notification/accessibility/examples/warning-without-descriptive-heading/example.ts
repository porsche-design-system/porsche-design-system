import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const warningWithoutDescriptiveHeadingA11yExample = {
  name: 'Warning without descriptive heading',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-inline-notification',
          properties: { state: 'warning', description: 'Something went wrong' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-inline-notification',
          properties: {
            state: 'warning',
            heading: 'Delivery date unavailable',
            description: 'Choose another date or contact your Porsche Centre.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
