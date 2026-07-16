import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const buttonPureA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-button-pure",
          properties: { 'aria-haspopup': "dialog", 'aria-label': "Open details of product XYZ" },
          children: [
            "Open details"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-button-pure",
          properties: { aria: { 'aria-haspopup': "dialog", 'aria-label': "Open details of product XYZ" } },
          children: [
            "Open details"
          ],
        },
      ],
    },
  },
  {
    title: "Icon-only button without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-button-pure",
          properties: { icon: "plus" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-button-pure",
          properties: { icon: "plus", hideLabel: true },
          children: [
            "Add item XYZ to shopping cart"
          ],
        },
      ],
    },
  },
  {
    title: "Vague button label without context",
    anti: {
      generator: () => [
        {
          tag: "p-button-pure",
          properties: { icon: "plus" },
          children: [
            "Add"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-button-pure",
          properties: { icon: "plus", aria: { 'aria-label': "Add item XYZ to shopping cart" } },
          children: [
            "Add"
          ],
        },
        "// or use descriptive visible text",
        {
          tag: "p-button-pure",
          properties: { icon: "plus" },
          children: [
            "Add item XYZ to cart"
          ],
        },
      ],
    },
  },
];
