import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const scrollerA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-scroller",
          properties: { 'aria-label': "Section tags", 'aria-description': "Section tags for the section overview" },
          children: [
            {
              tag: "p-tag",
              children: [
                "Overview"
              ],
            },
            {
              tag: "p-tag",
              children: [
                "Equipment"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-scroller",
          properties: { aria: { 'aria-label': "Section tags", 'aria-description': "Section tags for the section overview" } },
          children: [
            {
              tag: "p-tag",
              children: [
                "Overview"
              ],
            },
            {
              tag: "p-tag",
              children: [
                "Equipment"
              ],
            }
          ],
        },
      ],
    },
  },
];
