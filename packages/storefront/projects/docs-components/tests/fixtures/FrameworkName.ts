import { defineMarkdownComponent } from '../../src/renderer/define';

/** Stands for a framework-aware registry component, e.g. one that names the framework's package. */
export const FrameworkName = defineMarkdownComponent<object>('FrameworkName', (_props, { framework }) => [
  { type: 'paragraph', children: [{ type: 'inlineCode', value: framework }] },
]);
