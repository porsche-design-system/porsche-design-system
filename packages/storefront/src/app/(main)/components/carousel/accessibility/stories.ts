import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const carouselA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-carousel",
          properties: { 'aria-label': "Slider" },
          children: [
            "<!-- slides -->"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-carousel",
          properties: { aria: { 'aria-label': "Featured Porsche models" } },
          children: [
            "<!-- slides -->"
          ],
        },
      ],
    },
  },
  {
    title: "Carousel without skip path for keyboard users",
    anti: {
      generator: () => [
        {
          tag: "p-carousel",
          children: [
            "<!-- many slides (>6 items) -->"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-carousel",
          properties: { skipLinkTarget: "#after-carousel", aria: { 'aria-label': "Highlights" } },
          children: [
            "<!-- many slides (>6 items) -->"
          ],
        },
        {
          tag: "p-heading",
          properties: { tag: "h2", id: "after-carousel" },
          children: [
            "Next section"
          ],
        },
      ],
    },
  },
  {
    title: "Vague carousel label",
    anti: {
      generator: () => [
        {
          tag: "p-carousel",
          properties: { aria: { 'aria-label': "Slider" } },
          children: [
            "<!-- slides -->"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-carousel",
          properties: { aria: { 'aria-label': "Featured Porsche models" } },
          children: [
            "<!-- slides -->"
          ],
        },
      ],
    },
  },
];
