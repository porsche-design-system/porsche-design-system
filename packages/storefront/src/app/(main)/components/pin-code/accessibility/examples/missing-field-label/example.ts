import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const missingFieldLabelA11yExample = {
  name: 'Missing field label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-pin-code',
          properties: { name: 'verification', length: 6 },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-pin-code',
          properties: {
            name: 'verification',
            length: 6,
            label: 'Verification code',
            description: 'Enter the 6-digit code from your email.',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
