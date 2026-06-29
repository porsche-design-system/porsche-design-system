import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const linkTileA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-link-tile",
          properties: { label: "Details", href: "#", 'aria-label': "Details of Porsche Taycan" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-link-tile",
          properties: { label: "Details", href: "#", aria: { 'aria-label': "Details of Porsche Taycan" } },
        },
      ],
    },
  },
  {
    title: "Vague link label without context",
    anti: {
      generator: () => [
        {
          tag: "p-link-tile",
          properties: { label: "Details", href: "#" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-link-tile",
          properties: { label: "Porsche Taycan details", href: "#" },
        },
      ],
    },
  },
];
