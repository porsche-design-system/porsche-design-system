import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const fieldsetA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Unlabeled field group",
    anti: {
      generator: () => [
        {
          tag: "p-fieldset",
          children: [
            {
              tag: "p-input-text",
              properties: { name: "street", label: "Street" },
            },
            {
              tag: "p-input-text",
              properties: { name: "city", label: "City" },
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-fieldset",
          properties: { label: "Delivery address" },
          children: [
            {
              tag: "p-input-text",
              properties: { name: "street", label: "Street" },
            },
            {
              tag: "p-input-text",
              properties: { name: "city", label: "City" },
            }
          ],
        },
      ],
    },
  },
  {
    title: "Error state without recovery guidance",
    anti: {
      generator: () => [
        {
          tag: "p-fieldset",
          properties: { label: "Delivery address", state: "error", message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-fieldset",
          properties: { label: "Delivery address", required: true, state: "error", message: "Complete all required address fields to continue." },
        },
      ],
    },
  },
];
