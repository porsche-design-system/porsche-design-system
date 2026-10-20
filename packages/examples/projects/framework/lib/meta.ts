import type { Framework, TagName } from '@porsche-design-system/shared';

/**
 * The `meta` export of an example's `meta.ts`. The folder of the file below `src/` is the example's id
 * (`src/components/select/set-value/meta.ts` → `components/select/set-value`), so renaming the folder renames the
 * example.
 */
export type FrameworkExampleMeta = {
  /** The PDS components the example shows. Empty for an example about something else, such as the AG Grid theme. */
  components: TagName[];
  /**
   * The source in the example apps of the wrappers, which compile it and run their e2e tests on it. A kebab-case base
   * name stands for one file per framework, named by the apps' conventions (`sourceFiles()`): `'select-example-dynamic'`
   * → `select-example-dynamic.html`, `select-example-dynamic.component.ts`, `SelectExampleDynamic.tsx` and
   * `SelectExampleDynamic.vue`. A source that deviates from them names its four files instead.
   */
  source: string | Record<Framework, string>;
  /**
   * Leaves the preview out of `frameworkExamplePreviews`, because every page whose server graph imports that map loads
   * all of its previews. For a preview with a large dependency (AG Grid's ~1.1 MB): the page that shows it imports it
   * by its own entry, `@porsche-design-system/examples-framework/previews/<Name>`.
   */
  standalone?: true;
};

/** An example as the package exports it: its id, the components it shows and its code for every framework. */
export type FrameworkExample<Id extends string = string> = {
  id: Id;
  components: TagName[];
  /** The code shown in the code tabs, opened in StackBlitz and written into the skills. */
  frameworkMarkup: Record<Framework, string>;
};
