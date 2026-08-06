import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { CodeSample } from '@porsche-design-system/shared';
import type { ComponentType } from 'react';
import type { ComponentAccessibilityMeta } from '@/models/accessibilityMeta';
import type { SlotStories, Story } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Meta describing a single example on a component's `examples` page.
 *
 * Discriminated by `kind`:
 *  - `kind: 'story'`       → rendered through the storefront `Story` generator pipeline.
 *  - `kind: 'example'`     → rendered from a manually authored cross-framework `CodeSample`.
 *  - `kind: 'description'` → description-only entry without a runnable story or code sample
 *                            (e.g. framework-specific guidance with inline code snippets in MDX).
 *
 * `Tag` defaults to `HTMLTagOrComponent` so that example entries on a component page
 * may render cross-component demos that don't share the page's primary tag.
 */
export type ExampleMeta<Tag extends HTMLTagOrComponent = HTMLTagOrComponent> =
  | {
      kind: 'story';
      name: string;
      description?: ComponentType;
      story: Story<Tag>;
    }
  | {
      kind: 'example';
      name: string;
      description?: ComponentType;
      example: CodeSample;
    }
  | {
      kind: 'description';
      name: string;
      description: ComponentType;
    };

/**
 * Aggregated meta for a component documentation page.
 *
 * `Tag` is the primary component tag and pins the configurator's typing. Example entries
 * use the broader `ExampleMeta` default so cross-component examples are still typable.
 *
 * Authors should declare the value with `satisfies ComponentDocsMeta<'p-xxx'>` to
 * preserve narrow literal keys in `examples` (enabling autocomplete and typo safety on
 * consumers like `accordionMeta.examples.stickySummary`).
 */
export type ComponentDocsMeta<Tag extends HTMLTagOrComponent> = {
  // MDX document introducing the component's purpose and primary use cases.
  introduction: ComponentType;
  // Story (and optional slot stories) powering the interactive configurator playground.
  configurator: {
    story: Story<Tag>;
    // Optional hand-authored CodeSample that replaces the story as the component's primary
    // example. Set when the storefront page renders a CodeSample instead of the interactive
    // configurator (e.g. imperative components like p-toast); the skill emits it as the
    // "Default" example in place of the bare story markup.
    example?: CodeSample;
    slotStories?: SlotStories<Tag>;
    // Optional controlled-mode variant for dual-mode components (e.g. p-popover). When present, the
    // configurator renders a "Behavior" segmented control to switch between uncontrolled and controlled.
    controlledStory?: Story<Tag>;
    controlledSlotStories?: SlotStories<Tag>;
  };
  // Curated examples shown on the examples page — either generated stories or hand-authored code samples.
  examples: Record<string, ExampleMeta<Tag>>;
  // Guidance on when and how to use the component, including Dos and Don'ts.
  usage: ComponentType;
  // Accessibility considerations specific to this component: overview prose, keyed anti-pattern/
  // recommended integration example pairs, and test-support prose.
  accessibility: ComponentAccessibilityMeta;
  // Optional supplementary notes (e.g. migration hints, edge cases).
  notes?: Record<string, { name: string; description: ComponentType }>;
  // Full API reference: props, slots, events and CSS variables.
  api: ComponentMeta;
};
