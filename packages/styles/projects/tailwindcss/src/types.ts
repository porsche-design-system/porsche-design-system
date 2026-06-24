/** A single CSS declaration, e.g. `color-scheme: dark` or `--p-color-canvas: #fff`. */
export type CssDeclaration = {
  /** Optional leading comment rendered above the declaration. */
  comment?: string;
  /** The CSS property or custom property. */
  property: string;
  /** The declaration value. */
  value: string | number;
};

/** A CSS rule or at-rule. Body is structured (`declarations`) or verbatim (`raw`). */
export type CssRule = {
  /** Optional leading comment rendered above the rule. */
  comment?: string;
  /** The selector or at-rule prelude, e.g. `:root`, `@supports …`. */
  selector: string;
  /** Declarations and/or nested rules belonging to this rule. */
  declarations?: CssNode[];
  /** Raw CSS body rendered verbatim instead of `declarations`. */
  raw?: string;
};

/** A raw CSS snippet (comment, deprecated alias, `@keyframes`, …) rendered verbatim. */
export type CssRaw = {
  /** The raw CSS rendered verbatim. */
  raw: string;
};

/** A declaration, a (possibly nested) rule, or a raw snippet. */
export type CssNode = CssRule | CssDeclaration | CssRaw;

/**
 * Any branch of the meta tree: a {@link CssNode} leaf, an array, or a nested record.
 * Records/arrays group for the docs; only leaves render. Lets the assembly flatten uniformly.
 */
export type ThemeBranch = CssNode | ThemeBranch[] | { [key: string]: ThemeBranch };

/** The full Tailwind CSS theme as data: output {@link file}, {@link description}, ordered {@link meta} tree. */
export type TailwindCssMeta = {
  /** The generated output file name, e.g. `index.css`. */
  file: string;
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** The ordered CssNode tree assembled into the final stylesheet. */
  meta: CssNode[];
};

/**
 * A documented Tailwind theme variable: a `description` + rendered `value`, extended with the
 * Tailwind-specific `property` (source for the `@theme` block) plus doc metadata. A `token` leaf
 * (recovered via `kindOf` by its `value`). Assignable to {@link CssDeclaration}.
 */
export type TailwindThemeVariable = {
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** The rendered value (a token, a CSS expression, …). */
  value: string | number;
  /** The CSS custom property feeding the `@theme` block, e.g. `--color-canvas`. */
  property: string;
  /** The Tailwind utility classes generated from this variable, e.g. `.bg-canvas`. */
  classes?: string[];
  /** Optional leading comment rendered above the declaration in the `@theme` block. */
  comment?: string;
};

/**
 * A documented Tailwind `@utility`: a `description` plus `selector` / `class` (docs) and the `raw`
 * declaration body (implementation detail, rendered verbatim). A `utility` leaf (recovered via
 * `kindOf` by the absence of `value`).
 */
export type TailwindUtility = {
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** Optional leading comment rendered above the utility, e.g. `Grid: Area Narrow`. */
  comment?: string;
  /** The at-rule prelude, e.g. `@utility col-full`. */
  selector: string;
  /** The generated utility class, e.g. `.col-full`. */
  class: string;
  /** The raw CSS declaration body (implementation detail, rendered verbatim). */
  raw: string;
};

/** A documented meta leaf — a token ({@link TailwindThemeVariable}) or a utility ({@link TailwindUtility}). */
export type TailwindNode = TailwindThemeVariable | TailwindUtility;

/** Any branch of the meta tree: a leaf {@link TailwindNode}, an array, or a nested record. Only leaves render; records and arrays group. */
export type TailwindBranch = TailwindNode | TailwindBranch[] | { [key: string]: TailwindBranch };

/**
 * The documented single source of truth, shared with the storefront docs and LLM context. A flat,
 * domain-keyed catalog mirroring `tokensMeta` (and the scss `ScssMeta`); each leaf's kind
 * (`token` | `utility`) is recoverable via `kindOf`. `gradient` is a utility domain here (Tailwind
 * emits CSS classes, not a token), and there are no `focus` / `mediaQuery` domains (Tailwind
 * built-in variants). Catalog groups are the same object references the CSS is built from, so docs
 * and generated CSS can't diverge. CSS-only plumbing (resets, defaults, layers, keyframes,
 * deprecated aliases) lives in the composition layer (`css/index.ts`).
 */
export type TailwindMeta = {
  border: {
    radius: {
      xs: TailwindThemeVariable;
      sm: TailwindThemeVariable;
      md: TailwindThemeVariable;
      lg: TailwindThemeVariable;
      xl: TailwindThemeVariable;
      '2xl': TailwindThemeVariable;
      '3xl': TailwindThemeVariable;
      '4xl': TailwindThemeVariable;
      full: TailwindThemeVariable;
    };
    width: TailwindThemeVariable[];
  };
  blur: {
    frosted: TailwindThemeVariable;
  };
  breakpoint: {
    xs: TailwindThemeVariable;
    sm: TailwindThemeVariable;
    md: TailwindThemeVariable;
    lg: TailwindThemeVariable;
    xl: TailwindThemeVariable;
    '2xl': TailwindThemeVariable;
  };
  color: {
    a11y: {
      focus: TailwindThemeVariable;
    };
    background: {
      canvas: TailwindThemeVariable;
      surface: TailwindThemeVariable;
      frosted: TailwindThemeVariable;
      frostedSoft: TailwindThemeVariable;
      frostedStrong: TailwindThemeVariable;
      backdrop: TailwindThemeVariable;
    };
    foreground: {
      contrastLower: TailwindThemeVariable;
      contrastLow: TailwindThemeVariable;
      contrastMedium: TailwindThemeVariable;
      contrastHigh: TailwindThemeVariable;
      contrastHigher: TailwindThemeVariable;
      primary: TailwindThemeVariable;
    };
    semantic: {
      success: TailwindThemeVariable;
      successLow: TailwindThemeVariable;
      successMedium: TailwindThemeVariable;
      successFrosted: TailwindThemeVariable;
      successFrostedSoft: TailwindThemeVariable;
      warning: TailwindThemeVariable;
      warningLow: TailwindThemeVariable;
      warningMedium: TailwindThemeVariable;
      warningFrosted: TailwindThemeVariable;
      warningFrostedSoft: TailwindThemeVariable;
      error: TailwindThemeVariable;
      errorLow: TailwindThemeVariable;
      errorMedium: TailwindThemeVariable;
      errorFrosted: TailwindThemeVariable;
      errorFrostedSoft: TailwindThemeVariable;
      info: TailwindThemeVariable;
      infoLow: TailwindThemeVariable;
      infoMedium: TailwindThemeVariable;
      infoFrosted: TailwindThemeVariable;
      infoFrostedSoft: TailwindThemeVariable;
    };
  };
  font: {
    family: {
      porscheNext: TailwindThemeVariable;
      sans: TailwindThemeVariable;
    };
    weight: {
      normal: TailwindThemeVariable;
      semibold: TailwindThemeVariable;
      bold: TailwindThemeVariable;
    };
    lineHeight: {
      normal: TailwindThemeVariable;
    };
    size: {
      '2xs': TailwindThemeVariable;
      xs: TailwindThemeVariable;
      sm: TailwindThemeVariable;
      md: TailwindThemeVariable;
      lg: TailwindThemeVariable;
      xl: TailwindThemeVariable;
      '2xl': TailwindThemeVariable;
      '3xl': TailwindThemeVariable;
      '4xl': TailwindThemeVariable;
      '5xl': TailwindThemeVariable;
    };
  };
  shadow: {
    sm: TailwindThemeVariable;
    md: TailwindThemeVariable;
    lg: TailwindThemeVariable;
  };
  spacing: {
    fluid: {
      xs: TailwindThemeVariable;
      sm: TailwindThemeVariable;
      md: TailwindThemeVariable;
      lg: TailwindThemeVariable;
      xl: TailwindThemeVariable;
      '2xl': TailwindThemeVariable;
    };
    static: {
      '2xs': TailwindThemeVariable;
      xs: TailwindThemeVariable;
      sm: TailwindThemeVariable;
      md: TailwindThemeVariable;
      lg: TailwindThemeVariable;
      xl: TailwindThemeVariable;
      '2xl': TailwindThemeVariable;
    };
  };
  motion: {
    duration: {
      sm: TailwindThemeVariable;
      md: TailwindThemeVariable;
      lg: TailwindThemeVariable;
      xl: TailwindThemeVariable;
    };
    ease: {
      inOut: TailwindThemeVariable;
      in: TailwindThemeVariable;
      out: TailwindThemeVariable;
    };
  };
  gradient: TailwindUtility[];
  typography: {
    heading: TailwindUtility[];
    text: TailwindUtility[];
    display: TailwindUtility[];
  };
  skeleton: TailwindUtility[];
  // Grouped by grid area, aligned with `EmotionMeta['grid']` / `ScssMeta['grid']`. `template` is the
  // whole-grid layout; each area exposes its placement utility (`column`) and line utilities
  // (`start`/`end`). Tailwind ships no grid tokens or per-area offsets, and its `span` division
  // utilities are area-agnostic, so they sit at the top level rather than nested under an area.
  grid: {
    template: TailwindUtility;
    narrow: { column: TailwindUtility; start: TailwindUtility; end: TailwindUtility };
    basic: { column: TailwindUtility; start: TailwindUtility; end: TailwindUtility };
    extended: { column: TailwindUtility; start: TailwindUtility; end: TailwindUtility };
    wide: { column: TailwindUtility; start: TailwindUtility; end: TailwindUtility };
    full: { column: TailwindUtility; start: TailwindUtility; end: TailwindUtility };
    span: { oneHalf: TailwindUtility; oneThird: TailwindUtility; twoThirds: TailwindUtility };
  };
};
