import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const tagDismissibleA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Dismiss button ARIA on host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-tag-dismissible",
          properties: { label: "Sport Chrono", 'aria-label': "Remove Sport Chrono filter" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-tag-dismissible",
          properties: { label: "Sport Chrono", aria: { 'aria-label': "Remove Sport Chrono filter" } },
        },
      ],
    },
  },
  {
    title: "Tag without descriptive label",
    anti: {
      generator: () => [
        {
          tag: "p-tag-dismissible",
          children: [
            {
              tag: "p-icon",
              properties: { name: "watch-sport-chrono" },
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-tag-dismissible",
          properties: { label: "Sport Chrono Package" },
          children: [
            {
              tag: "p-icon",
              properties: { name: "watch-sport-chrono" },
            }
          ],
        },
      ],
    },
  },
];
