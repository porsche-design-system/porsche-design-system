import type { Deprecation } from '@porsche-design-system/shared/deprecation';

// The tailwind meta model. `tailwindCatalog` holds every public declaration, documented and
// deprecated alike; `tailwindMeta` is that catalog minus its deprecated declarations, checked
// against the hand-authored `StylesMeta` contract.

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
  /** Present means deprecated: excluded from `tailwindMeta`, published in `tailwindDeprecations`. */
  deprecation?: Deprecation;
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
  /** Present means deprecated: excluded from `tailwindMeta`, published in `tailwindDeprecations`. */
  deprecation?: Deprecation;
};

/** A catalog is a leaf, a list, or a group. Only leaves render; lists and groups only structure. */
export type TailwindCatalog =
  | TailwindThemeVariable
  | TailwindUtility
  | TailwindCatalog[]
  | { [key: string]: TailwindCatalog };

/** A catalog without its deprecated declarations. */
export type TailwindMeta<T> = T extends { deprecation: unknown }
  ? never
  : T extends readonly (infer U)[]
    ? TailwindMeta<U>[]
    : T extends TailwindThemeVariable | TailwindUtility
      ? T
      : { [K in keyof T as [TailwindMeta<T[K]>] extends [never] ? never : K]: TailwindMeta<T[K]> };

/**
 * How we want styles categorised and named, independent of the styling solution. Hand-authored
 * intent: `tailwindMeta` is checked against it, so deprecating or renaming a documented declaration
 * fails the build until this shape is updated. Parameterized so it can become the shared
 * cross-solution contract, but still package-local — Tailwind's shape genuinely differs today:
 * `gradient` is a utility domain (Tailwind emits classes, not a token), there are no `focus` /
 * `mediaQuery` domains (built-in variants) and `grid` ships utilities rather than tokens.
 *
 * CSS-only plumbing (resets, defaults, layers, keyframes) is not part of the model and lives in the
 * composition layer (`css/index.ts`).
 */
export type StylesMeta<TToken, TUtility> = {
  border: {
    radius: {
      xs: TToken;
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
      '2xl': TToken;
      '3xl': TToken;
      '4xl': TToken;
      full: TToken;
    };
    width: TToken[];
  };
  blur: {
    frosted: TToken;
  };
  breakpoint: {
    xs: TToken;
    sm: TToken;
    md: TToken;
    lg: TToken;
    xl: TToken;
    '2xl': TToken;
  };
  color: {
    a11y: {
      focus: TToken;
    };
    background: {
      canvas: TToken;
      surface: TToken;
      frosted: TToken;
      frostedSoft: TToken;
      frostedStrong: TToken;
      backdrop: TToken;
    };
    foreground: {
      contrastLower: TToken;
      contrastLow: TToken;
      contrastMedium: TToken;
      contrastHigh: TToken;
      contrastHigher: TToken;
      primary: TToken;
    };
    semantic: {
      success: TToken;
      successLow: TToken;
      successMedium: TToken;
      successFrosted: TToken;
      successFrostedSoft: TToken;
      warning: TToken;
      warningLow: TToken;
      warningMedium: TToken;
      warningFrosted: TToken;
      warningFrostedSoft: TToken;
      error: TToken;
      errorLow: TToken;
      errorMedium: TToken;
      errorFrosted: TToken;
      errorFrostedSoft: TToken;
      info: TToken;
      infoLow: TToken;
      infoMedium: TToken;
      infoFrosted: TToken;
      infoFrostedSoft: TToken;
    };
  };
  font: {
    family: {
      porscheNext: TToken;
      sans: TToken;
    };
    weight: {
      normal: TToken;
      semibold: TToken;
      bold: TToken;
    };
    lineHeight: {
      normal: TToken;
    };
    size: {
      '2xs': TToken;
      xs: TToken;
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
      '2xl': TToken;
      '3xl': TToken;
      '4xl': TToken;
      '5xl': TToken;
    };
  };
  shadow: {
    sm: TToken;
    md: TToken;
    lg: TToken;
  };
  spacing: {
    fluid: {
      xs: TToken;
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
      '2xl': TToken;
    };
    static: {
      '2xs': TToken;
      xs: TToken;
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
      '2xl': TToken;
    };
  };
  motion: {
    duration: {
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
    };
    ease: {
      inOut: TToken;
      in: TToken;
      out: TToken;
    };
  };
  gradient: TUtility[];
  typography: {
    heading: TUtility[];
    text: TUtility[];
    display: TUtility[];
  };
  skeleton: TUtility[];
  // Grouped by grid area, aligned with `EmotionMeta['grid']` / `ScssMeta['grid']`. `template` is the
  // whole-grid layout; each area exposes its placement utility (`column`) and line utilities
  // (`start`/`end`). Tailwind ships no grid tokens or per-area offsets, and its `span` division
  // utilities are area-agnostic, so they sit at the top level rather than nested under an area.
  grid: {
    template: TUtility;
    narrow: { column: TUtility; start: TUtility; end: TUtility };
    basic: { column: TUtility; start: TUtility; end: TUtility };
    extended: { column: TUtility; start: TUtility; end: TUtility };
    wide: { column: TUtility; start: TUtility; end: TUtility };
    full: { column: TUtility; start: TUtility; end: TUtility };
    span: { oneHalf: TUtility; oneThird: TUtility; twoThirds: TUtility };
  };
};
