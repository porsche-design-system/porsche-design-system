import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const checkboxA11yExamples: A11yIntegrationExample[] = [
  {
    title: 'Hidden label without accessible name',
    anti: {
      generator: () => [
        {
          tag: "p-checkbox",
          properties: { name: "terms", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: {
            name: 'terms',
            hideLabel: true,
            label: 'I accept the terms and conditions',
          },
        },
      ],
    },
  },
  {
    title: 'Validation feedback via state and message API',
    anti: {
      generator: () => [
        {
          tag: "p-checkbox",
          properties: { name: "terms", label: "I accept the terms and conditions", 'aria-invalid': true, message: "Required" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: {
            name: 'terms',
            label: 'I accept the terms and conditions',
            required: true,
            state: 'error',
            message: 'Accept the terms and conditions to continue.',
          },
        },
      ],
    },
  },
];
