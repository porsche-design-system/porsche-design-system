import type { Framework, TagName } from '@porsche-design-system/shared';

/**
 * The `meta` export of an example story's `meta.ts`, next to its `story.ts`. A plain module, because the story's is
 * `'use client'`: the Storefront's server reads what names the example from the generated index, not from the story.
 * A default story (`components/<component>/default`) has none; it is titled `Default`.
 */
export type StoryExampleMeta = {
  /** The heading of the example, in the Storefront and in the skills. */
  title: string;
};

/**
 * A story example as the package exports it by id, in the shape every project of `packages/examples` exports and the
 * catalogue of `@porsche-design-system/examples` merges: what names it, its description and its code.
 */
export type StoryExample<Id extends string = string> = {
  id: Id;
  kind: 'story';
  title: string;
  /** The MDX source of its `example.mdx`. */
  description?: string;
  components: TagName[];
  /** The code of the story in its own state, for every framework, as the skills show it. */
  code: Record<Framework, string>;
};

/** An accessibility example as the package exports it by id: the anti-pattern and the recommendation as snippets. */
export type AccessibilityExample<Id extends string = string> = {
  id: Id;
  kind: 'accessibility';
  title: string;
  components: TagName[];
  antiPattern: Record<Framework, string>;
  recommended: Record<Framework, string>;
};
