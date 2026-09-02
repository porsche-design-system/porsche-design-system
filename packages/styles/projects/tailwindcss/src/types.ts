import type { Deprecated } from '@porsche-design-system/shared/deprecation';

export type CssDeclaration = {
  comment?: string;
  property: string;
  value: string | number;
};

/** A CSS rule or at-rule. Body is structured (`declarations`) or verbatim (`raw`). */
export type CssRule = {
  comment?: string;
  selector: string;
  declarations?: CssNode[];
  raw?: string;
};

export type CssRaw = {
  raw: string;
};

export type CssNode = CssRule | CssDeclaration | CssRaw;

/** Grouping branches organize documentation; only `CssNode` leaves render. */
export type ThemeBranch = CssNode | ThemeBranch[] | { [key: string]: ThemeBranch };

export type TailwindCssMeta = {
  file: string;
  description: string;
  meta: CssNode[];
};

/**
 * Documented `@theme` variable. `kindOf` recognizes token leaves by their `value`.
 */
export type TailwindThemeVariable = {
  description: string;
  value: string | number;
  property: string;
  classes?: string[];
  comment?: string;
} & Deprecated;

/**
 * Documented `@utility`. `kindOf` recognizes utility leaves by the absence of `value`.
 */
export type TailwindUtility = {
  description: string;
  comment?: string;
  selector: string;
  class: string;
  raw: string;
} & Deprecated;

export type TailwindCatalog =
  | TailwindThemeVariable
  | TailwindUtility
  | TailwindCatalog[]
  | { [key: string]: TailwindCatalog };

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
