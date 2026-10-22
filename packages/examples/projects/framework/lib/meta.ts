import type { Framework, TagName } from '@porsche-design-system/shared';

/**
 * The `meta` export of an example's `meta.ts`. The folder of the file below `src/` is the example's id
 * (`src/components/select/set-value/meta.ts` → `components/select/set-value`), so renaming the folder renames the
 * example.
 */
export type FrameworkExampleMeta = {
  /** The heading of the example, in the Storefront and in the skills. `Default` for a component's default example. */
  title: string;
  /** The PDS components the example shows. Empty for an example about something else, such as the AG Grid theme. */
  components: TagName[];
  /**
   * The source in the example apps of the wrappers, which compile it and run their e2e tests on it. A kebab-case base
   * name stands for one file per framework, named by the apps' conventions (`sourceFiles()`): `'select-example-dynamic'`
   * → `select-example-dynamic.html`, `select-example-dynamic.component.ts`, `SelectExampleDynamic.tsx` and
   * `SelectExampleDynamic.vue`. A source that deviates from them names its four files instead.
   */
  source: string | Record<Framework, string>;
};

/**
 * An example by id, as `frameworkExamples` holds it: in the shape every project of `packages/examples` exports and the
 * catalogue of `@porsche-design-system/examples` merges.
 */
export type FrameworkExample<Id extends string = string> = {
  id: Id;
  kind: 'framework';
  /** The heading of the example, in the Storefront and in the skills. */
  title: string;
  /** The MDX source of its `example.mdx`. */
  description?: string;
  components: TagName[];
  /** The code shown in the code tabs, opened in StackBlitz and written into the skills. */
  code: Record<Framework, string>;
};
