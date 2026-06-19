import type { ScssMixin, ScssRaw } from '../types';

// The documented `prose-heading-*` / `prose-text-*` mixins delegate to the private `-prose-*` helpers
// and keep their namespaced `font.` references.

/** The documented heading variants, applied primarily to heading tags (largest → smallest). */
export const heading = [
  {
    name: 'prose-heading-5xl',
    description:
      'Applies the **5x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-5xl, font.$font-weight-normal);',
  },
  {
    name: 'prose-heading-4xl',
    description:
      'Applies the **4x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-4xl, font.$font-weight-normal);',
  },
  {
    name: 'prose-heading-3xl',
    description:
      'Applies the **3x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-3xl, font.$font-weight-normal);',
  },
  {
    name: 'prose-heading-2xl',
    description:
      'Applies the **2x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-2xl, font.$font-weight-normal);',
  },
  {
    name: 'prose-heading-xl',
    description:
      'Applies the **x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-xl, font.$font-weight-normal);',
  },
  {
    name: 'prose-heading-lg',
    description:
      'Applies the **large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-lg, font.$font-weight-normal);',
  },
  {
    name: 'prose-heading-md',
    description:
      'Applies the **medium** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-md, font.$font-weight-normal);',
  },
  {
    name: 'prose-heading-sm',
    description:
      'Applies the **small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-sm, font.$font-weight-semibold);',
  },
  {
    name: 'prose-heading-xs',
    description:
      'Applies the **x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-xs, font.$font-weight-semibold);',
  },
  {
    name: 'prose-heading-2xs',
    description:
      'Applies the **2x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: '  @include -prose-heading(font.$typescale-2xs, font.$font-weight-semibold);',
  },
] satisfies ScssMixin[];

/** The documented text variants, applied primarily to flow-content tags (largest → smallest). */
export const text = [
  {
    name: 'prose-text-5xl',
    description: 'Applies the **5x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-5xl);',
  },
  {
    name: 'prose-text-4xl',
    description: 'Applies the **4x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-4xl);',
  },
  {
    name: 'prose-text-3xl',
    description: 'Applies the **3x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-3xl);',
  },
  {
    name: 'prose-text-2xl',
    description: 'Applies the **2x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-2xl);',
  },
  {
    name: 'prose-text-xl',
    description: 'Applies the **x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-xl);',
  },
  {
    name: 'prose-text-lg',
    description: 'Applies the **large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-lg);',
  },
  {
    name: 'prose-text-md',
    description: 'Applies the **medium** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-md);',
  },
  {
    name: 'prose-text-sm',
    description: 'Applies the **small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-sm);',
  },
  {
    name: 'prose-text-xs',
    description: 'Applies the **x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-xs);',
  },
  {
    name: 'prose-text-2xs',
    description: 'Applies the **2x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: '  @include -prose-text(font.$typescale-2xs);',
  },
] satisfies ScssMixin[];

/** No documented display mixins — the `pds-display-*` aliases are deprecated plumbing. */
export const display = [] satisfies ScssMixin[];

/** Typography mixins grouped like the storefront API tables and the tailwind taxonomy. */
export const typography = { heading, text, display };

/** The private `-prose-heading` helper the `prose-heading-*` mixins delegate to (plumbing, emitted first). */
export const proseHeadingHelper: ScssRaw = {
  raw: `@mixin -prose-heading($size, $weight) {
  @include font.cjk-font-family;
  font: $weight $size / font.$leading-normal font.$font-porsche-next;
  color: color.$color-primary;
}`,
};

/** The private `-prose-text` helper the documented `prose-text-*` mixins delegate to. Plumbing. */
export const proseTextHelper: ScssRaw = {
  raw: `@mixin -prose-text($size) {
  @include font.cjk-font-family;
  font: font.$font-weight-normal $size / font.$leading-normal font.$font-porsche-next;
  color: color.$color-primary;
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
