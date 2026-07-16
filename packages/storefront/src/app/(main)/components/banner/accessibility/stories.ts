import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const bannerA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Banner mounted only when shown",
    anti: {
      generator: () => [
        "// Banner is created only when an error occurs — live region may not announce.\nif (hasError) {\n  document.body.insertAdjacentHTML('beforeend', '<p-banner open heading=\"Error\">Something went wrong.</p-banner>');\n}",
      ],
    },
    recommended: {
      generator: () => [
        "// Pre-render the banner and update content when needed.",
        {
          tag: "p-banner",
          properties: { id: "form-banner", heading: "Error", description: "Check the highlighted fields and try again.", state: "error" },
        },
      ],
    },
  },
  {
    title: "Error feedback without descriptive content",
    anti: {
      generator: () => [
        {
          tag: "p-banner",
          properties: { open: true, state: "error", description: "Error" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-banner",
          properties: { open: true, state: "error", heading: "Payment could not be processed", description: "Check your card details or try another payment method." },
        },
      ],
    },
  },
];
