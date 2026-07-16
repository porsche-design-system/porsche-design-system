import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const selectA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Prompt option used instead of a label",
    anti: {
      generator: () => [
        {
          tag: "p-select",
          properties: { name: "model" },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "" },
              children: [
                "Select a model"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "carrera-s" },
              children: [
                "911 Carrera S"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-select",
          properties: { label: "Porsche model", name: "model", description: "Choose the model for your configuration." },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "carrera-s" },
              children: [
                "911 Carrera S"
              ],
            }
          ],
        },
      ],
    },
  },
  {
    title: "Ambiguous option labels without field context",
    anti: {
      generator: () => [
        {
          tag: "p-select",
          properties: { label: "Model", name: "model" },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "base" },
              children: [
                "Base"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "s" },
              children: [
                "S"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-select",
          properties: { label: "Porsche 911 trim", name: "model", description: "Select the trim level for your configuration." },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "carrera-s" },
              children: [
                "911 Carrera S"
              ],
            }
          ],
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-select",
          properties: { name: "model", hideLabel: true },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-select",
          properties: { label: "Porsche model", name: "model", hideLabel: true },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            }
          ],
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-select",
          properties: { label: "Porsche model", name: "model", 'aria-invalid': true, message: "Required" },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "carrera-s" },
              children: [
                "911 Carrera S"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-select",
          properties: { label: "Porsche model", name: "model", state: "error", message: "Select a model to continue with your configuration." },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "carrera-s" },
              children: [
                "911 Carrera S"
              ],
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
          tag: "p-select",
          properties: { label: "Porsche model", name: "model", state: "error", message: "Invalid" },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "carrera-s" },
              children: [
                "911 Carrera S"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-select",
          properties: { label: "Porsche model", name: "model", required: true, state: "error", message: "Select a Porsche model. This field is required to continue." },
          children: [
            {
              tag: "p-select-option",
              properties: { value: "carrera" },
              children: [
                "911 Carrera"
              ],
            },
            {
              tag: "p-select-option",
              properties: { value: "carrera-s" },
              children: [
                "911 Carrera S"
              ],
            }
          ],
        },
      ],
    },
  },
];
