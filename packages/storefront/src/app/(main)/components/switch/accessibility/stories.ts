import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const switchA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Switch without descriptive label",
    anti: {
      generator: () => [
        {
          tag: "p-switch",
          properties: { name: "notifications" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-switch",
          properties: { name: "notifications" },
          children: [
            "Email notifications for order updates"
          ],
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-switch",
          properties: { name: "notifications", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-switch",
          properties: { name: "notifications", hideLabel: true },
          children: [
            "Email notifications for order updates"
          ],
        },
      ],
    },
  },
];
