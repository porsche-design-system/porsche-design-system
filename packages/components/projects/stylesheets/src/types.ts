import type { Deprecated } from '@porsche-design-system/shared/deprecation';

// Global-style metadata is independent from tokens because their public surfaces are not 1:1.

/** The CSS custom property category; also acts as the color discriminant. */
export type CssVariableType = 'color' | 'font' | 'spacing' | 'border' | 'blur' | 'shadow' | 'motion';

/**
 * CSS variable metadata doubles as a renderable declaration. Color variables alone carry explicit
 * light/dark values for the `light-dark()` fallback.
 */
export type CssVariableMeta = CssVariableMetaBase &
  (
    | {
        type: 'color';
        valueLight: string;
        valueDark: string;
      }
    | { type: Exclude<CssVariableType, 'color'> }
  );

type CssVariableMetaBase = CssDeclaration &
  Deprecated & {
    description: string;
    type: CssVariableType;
  };

export type ColorCssVariableMeta = Extract<CssVariableMeta, { type: 'color' }>;

/**
 * Documented `.scheme-*` utility that also serves as a renderable CSS rule.
 */
export type ColorSchemeClassMeta = CssRule &
  Deprecated & {
    usage: string;
    description: string;
  };

/** Structurally discriminated by `property` for tokens and `selector` for utilities. */
export type StylesheetNode = CssVariableMeta | ColorSchemeClassMeta;

export type StylesheetTokenTree = { [key: string]: StylesheetTokenTree | CssVariableMeta };

/**
 * The precise per-domain shape of the documented CSS variable tokens. Domain order mirrors the
 * emitted `variables.css` declaration order (kept stable for byte-identical output); the
 * vocabulary (`font`, `border.radius`, `motion.ease`, `font.size`) mirrors the scss meta model.
 */
export type CssVariableTokens = {
  color: {
    background: Record<string, ColorCssVariableMeta>;
    foreground: Record<string, ColorCssVariableMeta>;
    semantic: Record<string, ColorCssVariableMeta>;
    a11y: Record<string, ColorCssVariableMeta>;
  };
  font: {
    family: Record<string, CssVariableMeta>;
    weight: Record<string, CssVariableMeta>;
    lineHeight: Record<string, CssVariableMeta>;
    size: Record<string, CssVariableMeta>;
  };
  spacing: {
    fluid: Record<string, CssVariableMeta>;
    static: Record<string, CssVariableMeta>;
  };
  border: {
    radius: Record<string, CssVariableMeta>;
  };
  blur: Record<string, CssVariableMeta>;
  shadow: Record<string, CssVariableMeta>;
  motion: {
    duration: Record<string, CssVariableMeta>;
    ease: Record<string, CssVariableMeta>;
  };
};

/**
 * Documented catalog. The normalize reset has no public leaves and remains in the CSS composition
 * layer.
 */
export type StylesheetsMeta = CssVariableTokens & {
  colorScheme: ColorSchemeClassMeta[];
};

// CSS resolution model

export type CssDeclaration = {
  property: string;
  value: string | number;
};

/** CSS rule or at-rule supporting nested rules in `declarations`. */
export type CssRule = {
  comment?: string;
  selector: string;
  declarations: CssNode[];
};

export type CssNode = CssRule | CssDeclaration;

export type GlobalStyleMeta = {
  file: string;
  description: string;
  meta: CssNode[];
};

export type GlobalStylesMeta = { [key: string]: GlobalStyleMeta };
