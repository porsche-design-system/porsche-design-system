import { frameworkExampleRuntime } from '@porsche-design-system/examples-framework/runtime';
import { storyExampleRuntime } from '@porsche-design-system/examples-stories/runtime';

/**
 * What renders a story or framework example in the Storefront, by id: a story example's stories (`story`, and for a
 * default story `slotStories`, `controlledStory`, `controlledSlotStories`), a framework example's live `Preview`, and
 * the `Description` of either, its `example.mdx` for the consumer's MDX loader to compile.
 *
 * Server only: the stories and previews are `'use client'`, so a server component hands a client component what it
 * shows. Every page whose server graph imports this loads all previews and stories; a `standalone` framework example
 * has no `Preview` here, and its page imports it by its own entry, `@porsche-design-system/examples-framework/previews/<Name>`.
 */
export const exampleRuntime = {
  ...storyExampleRuntime,
  ...frameworkExampleRuntime,
};

export type ExampleRuntime = typeof exampleRuntime;
