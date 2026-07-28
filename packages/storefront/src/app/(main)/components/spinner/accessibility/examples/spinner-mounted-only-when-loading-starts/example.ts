import type { AccessibilityExample, ExampleMarkupSample } from '@/models/accessibilityMeta';

const mountedOnlyWhenLoadingStarts: ExampleMarkupSample = {
  frameworkMarkup: {
    'vanilla-js': `if (isLoading) {
  container.innerHTML = '<p-spinner></p-spinner>';
}`,
    angular: `@if (isLoading) {
  <p-spinner></p-spinner>
}`,
    react: '{isLoading && <PSpinner />}',
    vue: '<PSpinner v-if="isLoading" />',
  },
};

export const spinnerMountedOnlyWhenLoadingStartsA11yExample = {
  name: 'Spinner mounted only when loading starts',
  antiPattern: {
    kind: 'example',
    example: mountedOnlyWhenLoadingStarts,
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-spinner',
          properties: { aria: { 'aria-label': 'Loading vehicle configuration' } },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
