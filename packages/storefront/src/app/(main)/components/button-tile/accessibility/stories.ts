import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const buttonTileA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-button-tile",
          properties: { label: "Open", 'aria-label': "Open details of Porsche Taycan", 'aria-haspopup': "dialog" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-button-tile",
          properties: { label: "Open", aria: { 'aria-haspopup': "dialog", 'aria-label': "Open details of Porsche Taycan" } },
        },
      ],
    },
  },
  {
    title: "Vague tile label without context",
    anti: {
      generator: () => [
        {
          tag: "p-button-tile",
          properties: { label: "Open" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-button-tile",
          properties: { label: "Configure Porsche Taycan" },
        },
      ],
    },
  },
];
