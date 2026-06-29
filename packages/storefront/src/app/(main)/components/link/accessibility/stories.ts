import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const linkA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-link",
          properties: { href: "https://porsche.com", 'aria-label': "Details of product XYZ" },
          children: [
            "Details"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-link",
          properties: { href: "https://porsche.com", aria: { 'aria-label': "Details of product XYZ" } },
          children: [
            "Details"
          ],
        },
      ],
    },
  },
  {
    title: "Icon-only link without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-link",
          properties: { icon: "arrow-right", href: "https://porsche.com" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-link",
          properties: { icon: "arrow-right", hideLabel: true, href: "https://porsche.com" },
          children: [
            "Product details"
          ],
        },
      ],
    },
  },
  {
    title: "Indicating the current page",
    anti: {
      generator: () => [
        {
          tag: "p-link",
          properties: { href: "/models/911", 'aria-current': "page" },
          children: [
            "911"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-link",
          properties: { href: "/models/911", aria: { 'aria-current': "page" } },
          children: [
            "911 Carrera"
          ],
        },
      ],
    },
  },
  {
    title: "Vague link label without context",
    anti: {
      generator: () => [
        {
          tag: "p-link",
          properties: { href: "https://porsche.com" },
          children: [
            "Show"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-link",
          properties: { href: "https://porsche.com", aria: { 'aria-label': "Show details of product XYZ" } },
          children: [
            "Show details"
          ],
        },
      ],
    },
  },
];
