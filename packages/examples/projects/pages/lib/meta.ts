import type { TagName } from '@porsche-design-system/shared';

/**
 * The types of an example – defined here once: the generated export re-exports them, and its bundled declarations
 * (`dist/examples.d.ts`) carry them.
 */

/**
 * What an example is, in words – authored once, as the `meta` export of its page. The page hands it to its layout,
 * which writes it into the `<title>` and the description of the document; everything else that presents the example
 * reads it from the package export.
 */
export type ExampleMeta = {
  /** Names the example on its own, outside the storefront page it is shown on: `'Popover: Local market switch'`. */
  title: string;
  /** What the example shows and when to use it, as plain text – no markup, no links. */
  description: string;
  /**
   * The color schemes the example is built for – `['light']` when left out. An example sets no scheme on `<html>`,
   * since that is the decision of the application it is copied into, so it renders light on its own. One that works
   * in both declares `['light', 'dark']`: the storefront then sets the scheme its visitor chose on the `<html>` of the
   * example, and the VRT and a11y suites capture it in the dark scheme as well.
   */
  colorSchemes?: ExampleColorScheme[];
};

/** A color scheme an example is built for. */
export type ExampleColorScheme = 'light' | 'dark';

const exampleColorSchemes: readonly ExampleColorScheme[] = ['light', 'dark'];

/**
 * An example in the shape every project of `packages/examples` exports, which the catalogue of
 * `@porsche-design-system/examples` merges: its id (its path), kind, meta, components and project.
 */
export type PageExample<Id extends string = string> = {
  /** `'patterns/header/overlay'` – the folder of its page below `src/`, and of its built page below `/examples/`. */
  id: Id;
  kind: 'pattern' | 'template';
  title: string;
  /** Plain text – no markup, no links. */
  description: string;
  /** The components the page is built from, each by the component documenting it (`getComponents()`). */
  components: TagName[];
  /**
   * Path inside the project → content, as StackBlitz opens it: `package.json`, `vite.config.ts`, `index.html`,
   * `main.js`, `style.css`. Media are not part of it – the SDK accepts text files only, and the pages reference their
   * media by `mediaPath`, which the storefront resolves against its own deployment before it hands the files over.
   */
  files: Record<string, string>;
  /** Where its built page is served, relative to the root of a site: `/examples/patterns/header/overlay/index.html`. */
  url: string;
  /** The color schemes it is built for, as its meta declares them – left out for the light scheme only. */
  colorSchemes?: ExampleColorScheme[];
};

const isFilledString = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

/** The `meta` export of a page, checked – a missing or empty title or description fails the build. */
export const assertExampleMeta = (meta: unknown, page: string): ExampleMeta => {
  const { title, description, colorSchemes } = (meta ?? {}) as Partial<ExampleMeta>;

  if (!isFilledString(title) || !isFilledString(description)) {
    throw new Error(`[examples] "${page}" needs to export \`meta\` with a title and a description`);
  }
  if (/[<>]/.test(`${title}${description}`)) {
    throw new Error(`[examples] the meta of "${page}" is plain text – it may not contain markup`);
  }
  if (
    colorSchemes !== undefined &&
    (!Array.isArray(colorSchemes) ||
      colorSchemes.length === 0 ||
      new Set(colorSchemes).size !== colorSchemes.length ||
      !colorSchemes.every((scheme) => exampleColorSchemes.includes(scheme)))
  ) {
    throw new Error(
      `[examples] the color schemes of "${page}" are a list of distinct ${exampleColorSchemes.map((scheme) => `"${scheme}"`).join(' and ')}`
    );
  }

  return {
    title: title.trim(),
    description: description.trim(),
    ...(colorSchemes && { colorSchemes: exampleColorSchemes.filter((scheme) => colorSchemes.includes(scheme)) }),
  };
};

/** Whether an example is built for the dark scheme as well – the storefront and the test suites then apply it. */
export const hasDarkScheme = ({ colorSchemes }: Pick<ExampleMeta, 'colorSchemes'>): boolean =>
  !!colorSchemes?.includes('dark');
