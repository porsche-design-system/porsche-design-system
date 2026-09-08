import type { AccessibilityExample, ExampleMarkupSample } from '@/models/accessibilityMeta';

const mountedOnlyWhenShown: ExampleMarkupSample = {
  frameworkMarkup: {
    'vanilla-js': `// Banner is created only when an error occurs — live region may not announce.
if (hasError) {
  document.body.insertAdjacentHTML('beforeend', '<p-banner open heading="Error">Something went wrong.</p-banner>');
}`,
    angular: `@if (hasError) {
  <p-banner [open]="true" heading="Error">Something went wrong.</p-banner>
}`,
    react: `{hasError && (
  <PBanner open heading="Error">
    Something went wrong.
  </PBanner>
)}`,
    vue: `<PBanner v-if="hasError" open heading="Error">
  Something went wrong.
</PBanner>`,
  },
};

export const bannerMountedOnlyWhenShownA11yExample = {
  name: 'Banner mounted only when shown',
  antiPattern: {
    kind: 'example',
    example: mountedOnlyWhenShown,
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        { comment: 'Pre-render the banner and update content when needed.' },
        {
          tag: 'p-banner',
          properties: {
            id: 'form-banner',
            heading: 'Error',
            description: 'Check the highlighted fields and try again.',
            state: 'error',
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
