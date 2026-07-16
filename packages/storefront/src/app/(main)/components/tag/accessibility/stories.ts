import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const tagA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Status conveyed by color and icon only",
    anti: {
      generator: () => [
        {
          tag: "p-tag",
          properties: { variant: "success", icon: "check" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-tag",
          properties: { variant: "success", icon: "check" },
          children: [
            "Configuration saved"
          ],
        },
      ],
    },
  },
];
