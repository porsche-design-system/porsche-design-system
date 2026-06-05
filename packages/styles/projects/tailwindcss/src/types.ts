/** A single CSS declaration, e.g. `color-scheme: dark` or `--p-color-canvas: #fff`. */
export type CssDeclaration = {
  /** The CSS property or custom property, e.g. `color-scheme` or `--p-color-canvas`. */
  property: string;
  /** The declaration value, e.g. `dark` or `light-dark(#fff, #000)`. */
  value: string | number;
};

/**
 * A CSS rule or at-rule. The body is either structured (`declarations`) or
 * an opaque `raw` CSS string. `raw` is always available as an escape hatch so
 * any part of the tree can fall back to verbatim CSS when structure adds no value.
 */
export type CssRule = {
  /** Optional leading comment rendered above the rule, e.g. `Simplified Chinese`. */
  comment?: string;
  /** The selector or at-rule prelude, e.g. `:root`, `.scheme-dark`, `@supports …`. */
  selector: string;
  /** Declarations and/or nested rules belonging to this rule. */
  declarations?: CssNode[];
  /** Raw CSS body rendered verbatim instead of `declarations`. */
  raw?: string;
};

/** A raw CSS snippet (comment, blank line, deprecated alias, `@keyframes`, …) rendered verbatim. */
export type CssRaw = {
  /** The raw CSS rendered verbatim. */
  raw: string;
};

/** A plain declaration, a (possibly nested) rule, or a raw snippet. */
export type CssNode = CssRule | CssDeclaration | CssRaw;

/**
 * The full Tailwind CSS theme described as data: the output {@link file}, a human
 * readable {@link description} (consumed by the docs + LLM context) and the
 * {@link meta} — the ordered {@link CssNode} tree assembled into the final stylesheet.
 */
export type TailwindCssMeta = {
  /** The generated output file name, e.g. `index.css`. */
  file: string;
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** The ordered CssNode tree assembled into the final stylesheet. */
  meta: CssNode[];
};

/**
 * The grouping of a theme variable, used to organize the documentation. Mirrors
 * the grouping used by the storefront API pages (e.g. color is split into
 * background/foreground/semantic/a11y, spacing into fluid/static).
 */
export type TailwindThemeVariableGroup =
  | 'background'
  | 'foreground'
  | 'semantic'
  | 'a11y'
  | 'typography'
  | 'breakpoint'
  | 'fluid'
  | 'static'
  | 'border'
  | 'blur'
  | 'shadow'
  | 'motion';

/**
 * A documented Tailwind theme variable. Extends a plain {@link CssDeclaration}
 * (property + value, the single source for the `@theme` block) with the extra
 * metadata required to render the storefront docs and the LLM context.
 */
export type TailwindThemeVariable = CssDeclaration & {
  /** The Tailwind utility classes generated from this variable, e.g. `.bg-canvas`. */
  classes?: string[];
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** Grouping used to organize the documentation tables. */
  group?: TailwindThemeVariableGroup;
  /** Optional leading comment rendered above the declaration in the `@theme` block. */
  comment?: string;
};

/**
 * A documented Tailwind `@utility`. Only `selector`, `class` and `description`
 * are structured (consumed by docs + LLM context); the declaration body is kept
 * as `raw` CSS because it is pure implementation detail.
 */
export type TailwindUtility = {
  /** Optional leading comment rendered above the utility, e.g. `Grid: Area Narrow`. */
  comment?: string;
  /** The at-rule prelude, e.g. `@utility col-full`. */
  selector: string;
  /** The generated utility class, e.g. `.col-full`. */
  class: string;
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** The raw CSS declaration body (implementation detail, rendered verbatim). */
  raw: string;
};
