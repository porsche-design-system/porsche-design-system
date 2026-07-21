import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const wordmarkA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-wordmark",
          properties: { href: "/", 'aria-label': "Porsche home" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-wordmark",
          properties: { href: "/", aria: { 'aria-label': "Porsche home" } },
        },
      ],
    },
  },
  {
    title: "Linked wordmark without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-wordmark",
          properties: { href: "/" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-wordmark",
          properties: { href: "/", aria: { 'aria-label': "Porsche home" } },
        },
      ],
    },
  },
];
