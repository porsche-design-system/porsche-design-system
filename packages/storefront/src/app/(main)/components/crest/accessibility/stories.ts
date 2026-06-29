import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const crestA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-crest",
          properties: { href: "/", 'aria-label': "Porsche home" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-crest",
          properties: { href: "/", aria: { 'aria-label': "Porsche home" } },
        },
      ],
    },
  },
];
