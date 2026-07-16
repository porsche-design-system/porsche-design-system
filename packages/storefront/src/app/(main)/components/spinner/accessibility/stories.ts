import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const spinnerA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Spinner mounted only when loading starts",
    anti: {
      generator: () => [
        "if (isLoading) {\n  container.innerHTML = '<p-spinner></p-spinner>';\n}",
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-spinner",
          properties: { aria: { 'aria-label': "Loading vehicle configuration" } },
        },
      ],
    },
  },
  {
    title: "Spinner without loading message",
    anti: {
      generator: () => [
        {
          tag: "p-spinner",
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-spinner",
          properties: { aria: { 'aria-label': "Loading vehicle configuration" } },
        },
      ],
    },
  },
];
