import type { AccessibilityExample, ExampleMarkupSample } from '@/models/accessibilityMeta';

const mountedOnlyWhenNeeded: ExampleMarkupSample = {
  frameworkMarkup: {
    'vanilla-js': `// Component is created only when a warning appears — live region may not announce.
if (hasWarning) {
  container.innerHTML = '<p-inline-notification state="warning" description="Warning"></p-inline-notification>';
}`,
    angular: `@if (hasWarning) {
  <p-inline-notification state="warning" description="Warning"></p-inline-notification>
}`,
    react: `{hasWarning && <PInlineNotification state="warning" description="Warning" />}`,
    vue: `<PInlineNotification v-if="hasWarning" state="warning" description="Warning" />`,
  },
};

const preRenderedNotification: ExampleMarkupSample = {
  frameworkMarkup: {
    'vanilla-js': `<p-inline-notification
  id="account-warning"
  state="warning"
  heading="Verify your email address"
  description="Confirm your email to receive order updates."
></p-inline-notification>`,
    angular: `<p-inline-notification
  id="account-warning"
  state="warning"
  heading="Verify your email address"
  description="Confirm your email to receive order updates."
></p-inline-notification>`,
    react: `<PInlineNotification
  id="account-warning"
  state="warning"
  heading="Verify your email address"
  description="Confirm your email to receive order updates."
/>`,
    vue: `<PInlineNotification
  id="account-warning"
  state="warning"
  heading="Verify your email address"
  description="Confirm your email to receive order updates."
/>`,
  },
};

export const notificationMountedOnlyWhenNeededA11yExample = {
  name: 'Notification mounted only when needed',
  antiPattern: {
    kind: 'example',
    example: mountedOnlyWhenNeeded,
  },
  recommended: {
    kind: 'example',
    example: preRenderedNotification,
  },
} satisfies AccessibilityExample;
