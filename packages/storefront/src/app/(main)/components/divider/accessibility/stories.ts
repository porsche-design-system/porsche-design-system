import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const dividerA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Divider as the only section separator",
    anti: {
      generator: () => [
        {
          tag: "p-text",
          children: [
            "Delivery details"
          ],
        },
        {
          tag: "p-divider",
        },
        {
          tag: "p-text",
          children: [
            "Payment details"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-heading",
          properties: { tag: "h2", size: "md" },
          children: [
            "Delivery details"
          ],
        },
        {
          tag: "p-text",
          children: [
            "..."
          ],
        },
        {
          tag: "p-divider",
        },
        {
          tag: "p-heading",
          properties: { tag: "h2", size: "md" },
          children: [
            "Payment details"
          ],
        },
        {
          tag: "p-text",
          children: [
            "..."
          ],
        },
      ],
    },
  },
];
