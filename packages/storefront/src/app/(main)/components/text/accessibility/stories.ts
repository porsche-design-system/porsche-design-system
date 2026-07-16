import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const textA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Heading tag used for styling only",
    anti: {
      generator: () => [
        {
          tag: "p-text",
          properties: { tag: "p", size: "lg", weight: "bold" },
          children: [
            "Delivery options"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-heading",
          properties: { tag: "h2", size: "lg" },
          children: [
            "Delivery options"
          ],
        },
      ],
    },
  },
];
