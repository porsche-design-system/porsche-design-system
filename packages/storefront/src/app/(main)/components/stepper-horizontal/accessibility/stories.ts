import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const stepperHorizontalA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Generic step labels without context",
    anti: {
      generator: () => [
        {
          tag: "p-stepper-horizontal",
          children: [
            {
              tag: "p-stepper-horizontal-item",
              properties: { state: "complete" },
              children: [
                "Step 1"
              ],
            },
            {
              tag: "p-stepper-horizontal-item",
              properties: { state: "current" },
              children: [
                "Step 2"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-stepper-horizontal",
          children: [
            {
              tag: "p-stepper-horizontal-item",
              properties: { state: "complete" },
              children: [
                "Configure vehicle"
              ],
            },
            {
              tag: "p-stepper-horizontal-item",
              properties: { state: "current" },
              children: [
                "Choose delivery date"
              ],
            },
            {
              tag: "p-stepper-horizontal-item",
              children: [
                "Review and confirm"
              ],
            }
          ],
        },
      ],
    },
  },
];
