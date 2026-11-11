import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const columnWithHiddenLabelA11yExample = {
  name: 'Column with hidden label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-table-head-cell',
          properties: { hideLabel: true },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-table-head-cell',
          properties: { hideLabel: true },
          children: ['Model'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
