import type { Deprecated } from '@porsche-design-system/shared/deprecation';

// The scss meta model. `scssCatalog` holds every public declaration, documented and deprecated
// alike; a declaration is deprecated by carrying the shared `Deprecated` marker in place. `scssMeta`
// is that catalog minus its deprecated declarations, `scssDeprecations` the deprecated remainder.

/** A scss variable. Renders a `$name: value;` declaration and, unless deprecated, a docs row. */
export type ScssVariable = {
  /** The `$`-prefixed Sass variable name, e.g. `$radius-xs`. */
  name: string;
  value: string | number;
  description: string;
  /** Trailing comment rendered after the declaration. Never carries deprecation semantics. */
  comment?: string;
} & Deprecated;

/** A scss mixin. Renders a `@mixin` and, unless deprecated, a docs row. */
export type ScssMixin = {
  name: string;
  /** Parameter list including parentheses, e.g. `()` or `($offset: 2px)`. */
  signature?: string;
  /** Verbatim mixin body — the escape hatch for `@if`, `@each`, `@content`, keyframes, … */
  raw: string;
  description: string;
  /** Comment rendered on its own line above the `@mixin` declaration. Never carries deprecation semantics. */
  comment?: string;
} & Deprecated;

/** A raw scss snippet (`@use`/`@forward` lines, lookup maps, …) rendered verbatim. Composition plumbing, never catalogued. */
export type ScssRaw = {
  raw: string;
};

/** Anything a partial renders. */
export type ScssNode = ScssVariable | ScssMixin | ScssRaw;

/** A catalog is a leaf, a list, or a group. Only leaves render; lists and groups only structure. */
export type ScssCatalog = ScssVariable | ScssMixin | ScssCatalog[] | { [key: string]: ScssCatalog };

/** A catalog without its deprecated declarations. */
export type ScssMeta<T> = T extends { deprecation: unknown }
  ? never
  : T extends readonly (infer U)[]
    ? ScssMeta<U>[]
    : T extends ScssVariable | ScssMixin
      ? T
      : { [K in keyof T as [ScssMeta<T[K]>] extends [never] ? never : K]: ScssMeta<T[K]> };

/** A per-file composition descriptor: output file, `@use` headers, description and ordered render nodes. */
export type ScssFileMeta = {
  file: string;
  description: string;
  /** `@use` headers this file needs so namespaced cross-references resolve, e.g. `['color']`. */
  uses?: string[];
  nodes: ScssNode[];
};

/**
 * How we want styles categorised and named, independent of the styling solution. Hand-authored
 * intent: `scssMeta` is checked against it, so deprecating or renaming a documented declaration
 * fails the build until this shape is updated. Parameterized so it can become the shared
 * cross-solution contract once the other styling packages adopt the catalog model.
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
    background: {
      canvas: TToken;
      surface: TToken;
      frosted: TToken;
      frostedSoft: TToken;
      frostedStrong: TToken;
      backdrop: TToken;
    };
    foreground: {
      primary: TToken;
      contrastHigher: TToken;
      contrastHigh: TToken;
      contrastMedium: TToken;
      contrastLow: TToken;
      contrastLower: TToken;
    };
    semantic: {
      info: TToken;
      infoMedium: TToken;
      infoLow: TToken;
      infoFrosted: TToken;
      infoFrostedSoft: TToken;
      success: TToken;
      successMedium: TToken;
      successLow: TToken;
      successFrosted: TToken;
      successFrostedSoft: TToken;
      warning: TToken;
      warningMedium: TToken;
      warningLow: TToken;
      warningFrosted: TToken;
      warningFrostedSoft: TToken;
      error: TToken;
      errorMedium: TToken;
      errorLow: TToken;
      errorFrosted: TToken;
      errorFrostedSoft: TToken;
    };
    a11y: {
      focus: TToken;
    };
  };
  font: {
    family: {
      porscheNext: TToken;
      porscheNextZhHans: TToken;
      porscheNextZhHant: TToken;
      porscheNextJa: TToken;
      porscheNextKo: TToken;
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
  gradient: {
    stopsFadeDark: TToken;
  };
  typography: {
    heading: TUtility[];
    text: TUtility[];
    display: TUtility[];
  };
  skeleton: TUtility[];
  // Grouped by grid area, aligned with `EmotionMeta['grid']` / `TailwindMeta['grid']`. `template` is the
  // `pds-grid` layout mixin, `gap` a token. scss has no per-area placement utility (`column`), so areas
  // expose only line tokens (`start`/`end`), per-area `span`s and offsets; only `full` has a composed
  // `offset` variable. The per-area `offset{Base,S,XXL}` tokens read the `--pds-grid-*` custom properties.
  grid: {
    template: TUtility;
    gap: TToken;
    narrow: {
      start: TToken;
      end: TToken;
      span: { oneHalf: TToken };
      offsetBase: TToken;
      offsetS: TToken;
      offsetXXL: TToken;
    };
    basic: {
      start: TToken;
      end: TToken;
      span: { oneHalf: TToken; oneThird: TToken; twoThirds: TToken };
      offsetBase: TToken;
      offsetS: TToken;
      offsetXXL: TToken;
    };
    extended: {
      start: TToken;
      end: TToken;
      span: { oneHalf: TToken };
      offsetBase: TToken;
      offsetS: TToken;
      offsetXXL: TToken;
    };
    wide: {
      start: TToken;
      end: TToken;
      offsetBase: TToken;
      offsetS: TToken;
      offsetXXL: TToken;
    };
    full: {
      start: TToken;
      end: TToken;
      offset: TToken;
    };
  };
  focus: TUtility[];
  mediaQuery: TUtility[];
};
