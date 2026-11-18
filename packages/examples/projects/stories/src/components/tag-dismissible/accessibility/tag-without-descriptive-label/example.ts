import type { AccessibilityExample } from '@porsche-design-system/story-generator';

export const tagWithoutDescriptiveLabelA11yExample = {
  name: 'Tag without descriptive label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tag-dismissible',
          children: [
            {
              tag: 'p-icon',
              properties: { name: 'watch-sport-chrono' },
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
          tag: 'p-tag-dismissible',
          properties: { label: 'Sport Chrono Package' },
          children: [
            {
              tag: 'p-icon',
              properties: { name: 'watch-sport-chrono' },
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
