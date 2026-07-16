import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const drilldownA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on trigger button host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-button",
          properties: { 'aria-haspopup': "dialog" },
          children: [
            "Menu"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-button",
          properties: { aria: { 'aria-haspopup': "dialog" } },
          children: [
            "Vehicle menu"
          ],
        },
      ],
    },
  },
  {
    title: "Drilldown label on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-drilldown",
          properties: { open: true, 'aria-label': "Navigation" },
          children: [
            "..."
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-drilldown",
          properties: { open: true, aria: { 'aria-label': "Vehicle navigation" } },
          children: [
            "..."
          ],
        },
      ],
    },
  },
  {
    title: "Trigger without popup semantics or context",
    anti: {
      generator: () => [
        {
          tag: "p-button",
          children: [
            "Menu"
          ],
        },
        {
          tag: "p-drilldown",
          children: [
            "..."
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-button",
          properties: { aria: { 'aria-haspopup': "dialog" } },
          children: [
            "Vehicle menu"
          ],
        },
        {
          tag: "p-drilldown",
          properties: { aria: { 'aria-label': "Vehicle navigation" } },
          children: [
            "..."
          ],
        },
      ],
    },
  },
];
