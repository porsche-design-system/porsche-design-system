import { camelCase, capitalCase } from 'change-case';
import type { ComponentType } from 'react';
import type { ComponentExampleMeta, ExampleMeta } from '@/models/meta';
import type { SlotStories, Story } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Minimal local type for Webpack's `require.context` so we don't depend on
 * `@types/webpack-env`. Next.js provides `require.context` at build time.
 */
type RequireContext = {
  keys(): string[];
  (id: string): unknown;
};

type DescriptionModule = {
  default: ComponentType;
};

type StoryModule = Record<string, unknown>;

export type BuildExampleMetaConfig = {
  /**
   * Single entry used as the `default` key in the resulting meta.
   * Typically points at the `configurator/` folder which contains
   * `introduction.mdx` and `story.ts`.
   */
  default?: {
    name?: string;
    /** require.context for the configurator folder, matching .mdx files. */
    descriptions: RequireContext;
    /** require.context for the configurator folder, matching .ts files. */
    stories: RequireContext;
  };
  /**
   * Multiple entries, one per subfolder. Each subfolder must contain an
   * `example.mdx` and an `example.ts`. The subfolder name becomes the
   * meta key (camelCased) and display name (capital cased).
   */
  examples?: {
    /** require.context for the examples folder, matching example MDX files. */
    descriptions: RequireContext;
    /** require.context for the examples folder, matching example TS files. */
    stories: RequireContext;
  };
};

/** Pick the first story and the first slotStories export from a story module. */
const pickStoryExports = <Tag extends HTMLTagOrComponent>(
  mod: StoryModule
): { story?: Story<Tag>; slotStories?: SlotStories<Tag> } => {
  let story: Story<Tag> | undefined;
  let slotStories: SlotStories<Tag> | undefined;

  for (const [key, value] of Object.entries(mod)) {
    if (key === 'default' || value == null) continue;
    if (/slotStories$/i.test(key)) {
      slotStories ??= value as SlotStories<Tag>;
    } else {
      story ??= value as Story<Tag>;
    }
  }

  return { story, slotStories };
};

const getModule = <T>(ctx: RequireContext, key: string): T | undefined =>
  ctx.keys().includes(key) ? (ctx(key) as T) : undefined;

/**
 * Assemble a `ComponentExampleMeta` from colocated MDX descriptions and TS stories.
 *
 * Folder convention:
 *
 *   <component>/
 *     configurator/
 *       introduction.mdx   -> default.description
 *       story.ts           -> default.story (+ default.slotStories if exported)
 *     examples/
 *       <example-name>/
 *         example.mdx      -> <exampleName>.description
 *         example.ts       -> <exampleName>.story
 *
 * MDX files are referenced as-is via their default export (a React component);
 * they are never parsed or transformed here.
 */
export const buildExampleMeta = <Tag extends HTMLTagOrComponent>(
  config: BuildExampleMetaConfig
): ComponentExampleMeta<Tag> => {
  const result: ComponentExampleMeta<Tag> = {};

  // --- default entry (configurator) ----------------------------------------
  if (config.default) {
    const { descriptions, stories, name } = config.default;
    const descKey = descriptions.keys().find((k: string) => k.endsWith('.mdx'));
    const storyKey = stories.keys().find((k: string) => k.endsWith('.ts'));

    if (descKey && storyKey) {
      const descMod = descriptions(descKey) as DescriptionModule;
      const storyMod = stories(storyKey) as StoryModule;
      const { story, slotStories } = pickStoryExports<Tag>(storyMod);

      result.default = {
        name: name ?? 'Default',
        description: descMod.default,
        story,
        slotStories,
      } as ExampleMeta<Tag>;
    }
  }

  // --- example entries -----------------------------------------------------
  if (config.examples) {
    const { descriptions, stories } = config.examples;
    const folders = new Set<string>();
    for (const key of descriptions.keys()) {
      // key looks like './sticky-summary/example.mdx'
      const [, folder] = key.split('/');
      if (folder) folders.add(folder);
    }

    for (const folder of folders) {
      const descMod = getModule<DescriptionModule>(descriptions, `./${folder}/example.mdx`);
      const storyMod = getModule<StoryModule>(stories, `./${folder}/example.ts`);
      if (!descMod || !storyMod) continue;

      const { story, slotStories } = pickStoryExports<Tag>(storyMod);

      result[camelCase(folder)] = {
        name: capitalCase(folder),
        description: descMod.default,
        story,
        slotStories,
      } as ExampleMeta<Tag>;
    }
  }

  return result;
};

