import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const textListA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Numbered list for non-sequential items",
    anti: {
      generator: () => [
        {
          tag: "p-text-list",
          properties: { type: "numbered" },
          children: [
            {
              tag: "p-text-list-item",
              children: [
                "Sport Chrono Package"
              ],
            },
            {
              tag: "p-text-list-item",
              children: [
                "BOSE Surround Sound"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-text-list",
          properties: { type: "unordered" },
          children: [
            {
              tag: "p-text-list-item",
              children: [
                "Sport Chrono Package"
              ],
            },
            {
              tag: "p-text-list-item",
              children: [
                "BOSE Surround Sound"
              ],
            }
          ],
        },
      ],
    },
  },
];
