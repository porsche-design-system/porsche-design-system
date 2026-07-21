import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inlineNotificationA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Notification mounted only when needed",
    anti: {
      generator: () => [
        "// Component is created only when a warning appears — live region may not announce.\nif (hasWarning) {\n  container.innerHTML = '<p-inline-notification state=\"warning\" description=\"Warning\"></p-inline-notification>';\n}",
      ],
    },
    recommended: {
      generator: () => [
        '// Pre-render the notification and update its content when needed.',
        {
          tag: 'p-inline-notification',
          properties: {
            id: 'account-warning',
            state: 'warning',
            heading: 'Verify your email address',
            description: 'Confirm your email to receive order updates.',
          },
        },
        '\n// or wrap inside an aria live region\n\n<div role="alert" aria-live="assertive">\n  if (hasWarning) {\n    container.innerHTML = \'<p-inline-notification state="warning" description="Warning"></p-inline-notification>\';\n  }\n</div>',
      ],
    },
  },
  {
    title: "Warning without descriptive heading",
    anti: {
      generator: () => [
        {
          tag: "p-inline-notification",
          properties: { state: "warning", description: "Something went wrong" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-inline-notification",
          properties: { state: "warning", heading: "Delivery date unavailable", description: "Choose another date or contact your Porsche Centre." },
        },
      ],
    },
  },
];
