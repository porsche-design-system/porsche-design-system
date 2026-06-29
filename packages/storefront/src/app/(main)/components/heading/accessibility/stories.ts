import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const headingA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Skipped heading level",
    anti: {
      generator: () => [
        {
          tag: "p-heading",
          properties: { tag: "h1", size: "xl" },
          children: [
            "Configure your Porsche"
          ],
        },
        {
          tag: "p-heading",
          properties: { tag: "h4", size: "md" },
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
          properties: { tag: "h1", size: "xl" },
          children: [
            "Configure your Porsche"
          ],
        },
        {
          tag: "p-heading",
          properties: { tag: "h2", size: "md" },
          children: [
            "Delivery options"
          ],
        },
      ],
    },
  },
];
