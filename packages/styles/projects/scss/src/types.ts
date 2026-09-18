import type { Deprecated } from '@porsche-design-system/shared/deprecation';

/** A SCSS variable rendered into source and, unless deprecated, documentation. */
export type ScssVariable = {
  name: string;
  value: string | number;
  description: string;
  /** Trailing comment rendered after the declaration. Never carries deprecation semantics. */
  comment?: string;
} & Deprecated;

/** A SCSS mixin rendered into source and, unless deprecated, documentation. */
export type ScssMixin = {
  name: string;
  signature?: string;
  /** Verbatim body supporting control flow and `@content`. */
  raw: string;
  description: string;
  /** Comment rendered on its own line above the `@mixin` declaration. Never carries deprecation semantics. */
  comment?: string;
} & Deprecated;

export type ScssRaw = {
  raw: string;
};

export type ScssNode = ScssVariable | ScssMixin | ScssRaw;

export type ScssCatalog = ScssVariable | ScssMixin | ScssCatalog[] | { [key: string]: ScssCatalog };

export type ScssMeta<T> = T extends { deprecation: unknown }
  ? never
  : T extends readonly (infer U)[]
    ? ScssMeta<U>[]
    : T extends ScssVariable | ScssMixin
      ? T
      : { [K in keyof T as [ScssMeta<T[K]>] extends [never] ? never : K]: ScssMeta<T[K]> };

export type ScssFileMeta = {
  file: string;
  description: string;
  /** Dependencies required for namespaced cross-references. */
  uses?: string[];
  nodes: ScssNode[];
};

/**
 * Cross-solution catalog contract. Exact keys make deprecations and renames explicit type changes.
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
