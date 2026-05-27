import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { CodeSample } from '@porsche-design-system/shared';
import type { ComponentType } from 'react';
import type { SlotStories, Story } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Meta describing a single example on a component's `examples` page.
 *
 * Discriminated by `kind` so that exactly one of `story` / `example` is required:
 *  - `kind: 'story'`   → rendered through the storefront `Story` generator pipeline.
 *  - `kind: 'example'` → rendered from a manually authored cross-framework `CodeSample`.
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
    };

/**
 * Aggregated meta for a component documentation page.
 *
 * `Tag` is the primary component tag and pins the configurator's typing. Example entries
 * use the broader `ExampleMeta` default so cross-component examples are still typable.
 *
 * Authors should declare the value with `satisfies ComponentExampleMeta<'p-xxx'>` to
 * preserve narrow literal keys in `examples` (enabling autocomplete and typo safety on
 * consumers like `accordionMeta.examples.stickySummary`).
 */
export type ComponentDocsMeta<Tag extends HTMLTagOrComponent> = {
  introduction: ComponentType;
  configurator: {
    story: Story<Tag>;
    slotStories?: SlotStories<Tag>;
  };
  examples: Record<string, ExampleMeta<Tag>>;
  usage: ComponentType;
  accessibility: ComponentType;
  api: ComponentMeta;
};
