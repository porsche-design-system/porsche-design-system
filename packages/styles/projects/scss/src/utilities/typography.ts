import { colorRef, fontRef } from '../namespaces';
import { localRef } from '../ref';
import { color } from '../theme/color';
import { cjkFontFamily, font as fontTheme } from '../theme/font';
import type { ScssMixin, ScssRaw } from '../types';

// The documented `prose-heading-*` / `prose-text-*` mixins delegate to the private `-prose-*` helpers
// and reference the `font` / `color` partials via `ref()`.

/** Name-only handle for the private `-prose-heading` helper (same partial → no namespace). */
const proseHeading = { name: '-prose-heading' };
/** Name-only handle for the private `-prose-text` helper (same partial → no namespace). */
const proseText = { name: '-prose-text' };

/** The documented heading variants, applied primarily to heading tags (largest → smallest). */
export const heading = [
  {
    name: 'prose-heading-5xl',
    description:
      'Applies the **5x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size['5xl'])}, ${fontRef(fontTheme.weight.normal)});`,
  },
  {
    name: 'prose-heading-4xl',
    description:
      'Applies the **4x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size['4xl'])}, ${fontRef(fontTheme.weight.normal)});`,
  },
  {
    name: 'prose-heading-3xl',
    description:
      'Applies the **3x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size['3xl'])}, ${fontRef(fontTheme.weight.normal)});`,
  },
  {
    name: 'prose-heading-2xl',
    description:
      'Applies the **2x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size['2xl'])}, ${fontRef(fontTheme.weight.normal)});`,
  },
  {
    name: 'prose-heading-xl',
    description:
      'Applies the **x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size.xl)}, ${fontRef(fontTheme.weight.normal)});`,
  },
  {
    name: 'prose-heading-lg',
    description:
      'Applies the **large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size.lg)}, ${fontRef(fontTheme.weight.normal)});`,
  },
  {
    name: 'prose-heading-md',
    description:
      'Applies the **medium** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size.md)}, ${fontRef(fontTheme.weight.normal)});`,
  },
  {
    name: 'prose-heading-sm',
    description:
      'Applies the **small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size.sm)}, ${fontRef(fontTheme.weight.semibold)});`,
  },
  {
    name: 'prose-heading-xs',
    description:
      'Applies the **x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size.xs)}, ${fontRef(fontTheme.weight.semibold)});`,
  },
  {
    name: 'prose-heading-2xs',
    description:
      'Applies the **2x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${localRef(proseHeading)}(${fontRef(fontTheme.size['2xs'])}, ${fontRef(fontTheme.weight.semibold)});`,
  },
] satisfies ScssMixin[];

/** The documented text variants, applied primarily to flow-content tags (largest → smallest). */
export const text = [
  {
    name: 'prose-text-5xl',
    description: 'Applies the **5x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size['5xl'])});`,
  },
  {
    name: 'prose-text-4xl',
    description: 'Applies the **4x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size['4xl'])});`,
  },
  {
    name: 'prose-text-3xl',
    description: 'Applies the **3x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size['3xl'])});`,
  },
  {
    name: 'prose-text-2xl',
    description: 'Applies the **2x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size['2xl'])});`,
  },
  {
    name: 'prose-text-xl',
    description: 'Applies the **x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size.xl)});`,
  },
  {
    name: 'prose-text-lg',
    description: 'Applies the **large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size.lg)});`,
  },
  {
    name: 'prose-text-md',
    description: 'Applies the **medium** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size.md)});`,
  },
  {
    name: 'prose-text-sm',
    description: 'Applies the **small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size.sm)});`,
  },
  {
    name: 'prose-text-xs',
    description: 'Applies the **x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size.xs)});`,
  },
  {
    name: 'prose-text-2xs',
    description: 'Applies the **2x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${localRef(proseText)}(${fontRef(fontTheme.size['2xs'])});`,
  },
] satisfies ScssMixin[];

/** No documented display mixins — the `pds-display-*` aliases are deprecated plumbing. */
export const display = [] satisfies ScssMixin[];

/** Typography mixins grouped like the storefront API tables and the tailwind taxonomy. */
export const typography = { heading, text, display };

/** The private `-prose-heading` helper the `prose-heading-*` mixins delegate to (plumbing, emitted first). */
export const proseHeadingHelper: ScssRaw = {
  raw: `@mixin -prose-heading($size, $weight) {
  @include ${fontRef(cjkFontFamily)};
  font: $weight $size / ${fontRef(fontTheme.lineHeight.normal)} ${fontRef(fontTheme.family.porscheNext)};
  color: ${colorRef(color.foreground.primary)};
}`,
};

/** The private `-prose-text` helper the documented `prose-text-*` mixins delegate to. Plumbing. */
export const proseTextHelper: ScssRaw = {
  raw: `@mixin -prose-text($size) {
  @include ${fontRef(cjkFontFamily)};
  font: ${fontRef(fontTheme.weight.normal)} $size / ${fontRef(fontTheme.lineHeight.normal)} ${fontRef(fontTheme.family.porscheNext)};
  color: ${colorRef(color.foreground.primary)};
}`,
};

/** Deprecated `pds-heading-*` aliases (plumbing). @deprecated Use the documented `prose-heading-*` mixins. */
export const headingDeprecatedAliases: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-heading-xx-large {
  @include prose-heading-2xl();
}
/* alias (deprecated) */
@mixin pds-heading-x-large {
  @include prose-heading-xl();
}
/* alias (deprecated) */
@mixin pds-heading-large {
  @include prose-heading-lg();
}
/* alias (deprecated) */
@mixin pds-heading-medium {
  @include prose-heading-md();
}
/* alias (deprecated) */
@mixin pds-heading-small {
  @include prose-heading-sm();
}`,
};

/** Deprecated `pds-text-*` aliases (plumbing). @deprecated Use the documented `prose-text-*` mixins. */
export const textDeprecatedAliases: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-text-x-large {
  @include prose-text-xl();
}
/* alias (deprecated) */
@mixin pds-text-large {
  @include prose-text-lg();
}
/* alias (deprecated) */
@mixin pds-text-medium {
  @include prose-text-md();
}
/* alias (deprecated) */
@mixin pds-text-small {
  @include prose-text-sm();
}
/* alias (deprecated) */
@mixin pds-text-x-small {
  @include prose-text-xs();
}
/* alias (deprecated) */
@mixin pds-text-xx-small {
  @include prose-text-2xs();
}`,
};

/** Deprecated `pds-display-*` aliases routed through the heading prose mixins (plumbing). @deprecated Use `prose-heading-3xl` / `-4xl` / `-5xl`. */
export const displayDeprecatedAliases: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-display-large {
  @include heading.prose-heading-5xl;
}
/* alias (deprecated) */
@mixin pds-display-medium {
  @include heading.prose-heading-4xl;
}
/* alias (deprecated) */
@mixin pds-display-small {
  @include heading.prose-heading-3xl;
}`,
};
