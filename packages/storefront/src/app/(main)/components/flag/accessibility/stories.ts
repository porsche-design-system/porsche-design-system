import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const flagA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Informative flag without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-flag",
          properties: { name: "germany" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-flag",
          properties: { name: "germany", aria: { 'aria-label': "Germany" } },
        },
      ],
    },
  },
  {
    title: "Decorative flag with redundant label",
    anti: {
      generator: () => [
        {
          tag: "p-flag",
          properties: { name: "germany", aria: { 'aria-label': "Germany" } },
        },
        {
          tag: "p-text",
          children: [
            "Germany"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-flag",
          properties: { name: "germany", ariaHidden: true },
        },
        {
          tag: "p-text",
          children: [
            "Germany"
          ],
        },
      ],
    },
  },
];
