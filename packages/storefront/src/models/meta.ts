import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { ExampleId } from '@porsche-design-system/examples';
import type { HTMLTagOrComponent } from '@porsche-design-system/story-generator';
import type { ComponentType } from 'react';
import type { ComponentAccessibilityMeta } from '@/models/accessibilityMeta';

/** `p-select` → `components/select`: where the examples of a component live, below `@porsche-design-system/examples`. */
export type ComponentExamplesPath<Tag extends HTMLTagOrComponent> = Tag extends `p-${infer Name}`
  ? `components/${Name}`
  : never;

/** The component's default example, which the configurator page shows. */
export type DefaultExampleId<Tag extends HTMLTagOrComponent> = Extract<
  ExampleId,
  `${ComponentExamplesPath<Tag>}/default`
>;

/** An example of the component other than its default or an accessibility example. */
export type ComponentExampleId<Tag extends HTMLTagOrComponent> = Exclude<
  Extract<ExampleId, `${ComponentExamplesPath<Tag>}/${string}`>,
  DefaultExampleId<Tag> | `${ComponentExamplesPath<Tag>}/accessibility/${string}`
>;

/**
 * Aggregated meta for a component documentation page. The examples are referenced by their id in
 * `@porsche-design-system/examples`, which holds their title, description, code and runtime; the meta only says which
 * of them the component's pages and skill show, and in which order.
 *
 * Authors should declare the value with `satisfies ComponentDocsMeta<'p-xxx'>`, which checks that every id belongs to
 * the component.
 */
export type ComponentDocsMeta<Tag extends HTMLTagOrComponent> = {
  // MDX document introducing the component's purpose and primary use cases.
  introduction: ComponentType;
  // The component's default example: a story the configurator starts from, or a framework example the configurator page
  // renders instead (e.g. imperative components like p-toast). The skill emits it as the "Default" example.
  configurator: DefaultExampleId<Tag>;
  // The examples on the examples page and in the skill, in their order.
  examples: ComponentExampleId<Tag>[];
  // Guidance on when and how to use the component, including Dos and Don'ts.
  usage: ComponentType;
  // Accessibility considerations specific to this component: overview prose, anti-pattern/recommended integration
  // example pairs by id, and test-support prose.
  accessibility: ComponentAccessibilityMeta<Tag>;
  // Optional supplementary notes (e.g. migration hints, edge cases).
  notes?: Record<string, { name: string; description: ComponentType }>;
  // Full API reference: props, slots, events and CSS variables.
  api: ComponentMeta;
};
