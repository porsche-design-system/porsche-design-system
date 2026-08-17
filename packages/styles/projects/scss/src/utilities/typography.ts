import { scssIdentifier } from '../deprecation';
import { colorRef, fontRef, namespace } from '../namespaces';
import { color } from '../theme/color';
import { cjkFontFamily, font } from '../theme/font';
import type { DeprecatedScssMixin, ScssMixin } from '../types';

// The documented `prose-heading-*` / `prose-text-*` mixins delegate to the private `-prose-*` helpers
// and reference the `font` / `color` partials via `ref()`.

/** The private `-prose-heading` helper the `prose-heading-*` mixins delegate to (plumbing, emitted first). */
export const proseHeadingHelper: ScssMixin = {
  name: '-prose-heading',
  signature: '($size, $weight)',
  description: 'The private helper the documented `prose-heading-*` mixins delegate to.',
  raw: `  @include ${fontRef(cjkFontFamily)};
  font: $weight $size / ${fontRef(font.lineHeight.normal)} ${fontRef(font.family.porscheNext)};
  color: ${colorRef(color.foreground.primary)};`,
};

/** The private `-prose-text` helper the documented `prose-text-*` mixins delegate to. Plumbing. */
export const proseTextHelper: ScssMixin = {
  name: '-prose-text',
  signature: '($size)',
  description: 'The private helper the documented `prose-text-*` mixins delegate to.',
  raw: `  @include ${fontRef(cjkFontFamily)};
  font: ${fontRef(font.weight.normal)} $size / ${fontRef(font.lineHeight.normal)} ${fontRef(font.family.porscheNext)};
  color: ${colorRef(color.foreground.primary)};`,
};

/** The documented heading variants, applied primarily to heading tags (largest → smallest). */
export const heading = [
  {
    name: 'prose-heading-5xl',
    description:
      'Applies the **5x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size['5xl'])}, ${fontRef(font.weight.normal)});`,
  },
  {
    name: 'prose-heading-4xl',
    description:
      'Applies the **4x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size['4xl'])}, ${fontRef(font.weight.normal)});`,
  },
  {
    name: 'prose-heading-3xl',
    description:
      'Applies the **3x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size['3xl'])}, ${fontRef(font.weight.normal)});`,
  },
  {
    name: 'prose-heading-2xl',
    description:
      'Applies the **2x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size['2xl'])}, ${fontRef(font.weight.normal)});`,
  },
  {
    name: 'prose-heading-xl',
    description:
      'Applies the **x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size.xl)}, ${fontRef(font.weight.normal)});`,
  },
  {
    name: 'prose-heading-lg',
    description:
      'Applies the **large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size.lg)}, ${fontRef(font.weight.normal)});`,
  },
  {
    name: 'prose-heading-md',
    description:
      'Applies the **medium** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size.md)}, ${fontRef(font.weight.normal)});`,
  },
  {
    name: 'prose-heading-sm',
    description:
      'Applies the **small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size.sm)}, ${fontRef(font.weight.semibold)});`,
  },
  {
    name: 'prose-heading-xs',
    description:
      'Applies the **x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size.xs)}, ${fontRef(font.weight.semibold)});`,
  },
  {
    name: 'prose-heading-2xs',
    description:
      'Applies the **2x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    raw: `  @include ${proseHeadingHelper.name}(${fontRef(font.size['2xs'])}, ${fontRef(font.weight.semibold)});`,
  },
] satisfies ScssMixin[];

/** The documented text variants, applied primarily to flow-content tags (largest → smallest). */
export const text = [
  {
    name: 'prose-text-5xl',
    description:
      'Applies the **5x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size['5xl'])});`,
  },
  {
    name: 'prose-text-4xl',
    description:
      'Applies the **4x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size['4xl'])});`,
  },
  {
    name: 'prose-text-3xl',
    description:
      'Applies the **3x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size['3xl'])});`,
  },
  {
    name: 'prose-text-2xl',
    description:
      'Applies the **2x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size['2xl'])});`,
  },
  {
    name: 'prose-text-xl',
    description:
      'Applies the **x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size.xl)});`,
  },
  {
    name: 'prose-text-lg',
    description:
      'Applies the **large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size.lg)});`,
  },
  {
    name: 'prose-text-md',
    description:
      'Applies the **medium** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size.md)});`,
  },
  {
    name: 'prose-text-sm',
    description:
      'Applies the **small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size.sm)});`,
  },
  {
    name: 'prose-text-xs',
    description:
      'Applies the **x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size.xs)});`,
  },
  {
    name: 'prose-text-2xs',
    description:
      'Applies the **2x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    raw: `  @include ${proseTextHelper.name}(${fontRef(font.size['2xs'])});`,
  },
] satisfies ScssMixin[];

/** No documented display mixins — the `pds-display-*` aliases are deprecated plumbing. */
export const display = [] satisfies ScssMixin[];

/** Typography mixins grouped like the storefront API tables and the tailwind taxonomy. */
export const typography = { heading, text, display };

/** The documented mixins keyed by name, so a deprecated alias references the node instead of retyping its name. */
const proseHeading = Object.fromEntries(heading.map((mixin) => [mixin.name, mixin])) as Record<string, ScssMixin>;
const proseText = Object.fromEntries(text.map((mixin) => [mixin.name, mixin])) as Record<string, ScssMixin>;

/** The deprecated `pds-heading-*` mixins, replaced by the documented `prose-heading-*` mixins. */
export const headingDeprecations = [
  {
    name: 'pds-heading-xx-large',
    raw: `  @include ${scssIdentifier(proseHeading['prose-heading-2xl'])};`,
    deprecation: { replacement: scssIdentifier(proseHeading['prose-heading-2xl']) },
  },
  {
    name: 'pds-heading-x-large',
    raw: `  @include ${scssIdentifier(proseHeading['prose-heading-xl'])};`,
    deprecation: { replacement: scssIdentifier(proseHeading['prose-heading-xl']) },
  },
  {
    name: 'pds-heading-large',
    raw: `  @include ${scssIdentifier(proseHeading['prose-heading-lg'])};`,
    deprecation: { replacement: scssIdentifier(proseHeading['prose-heading-lg']) },
  },
  {
    name: 'pds-heading-medium',
    raw: `  @include ${scssIdentifier(proseHeading['prose-heading-md'])};`,
    deprecation: { replacement: scssIdentifier(proseHeading['prose-heading-md']) },
  },
  {
    name: 'pds-heading-small',
    raw: `  @include ${scssIdentifier(proseHeading['prose-heading-sm'])};`,
    deprecation: { replacement: scssIdentifier(proseHeading['prose-heading-sm']) },
  },
] satisfies DeprecatedScssMixin[];

/** The deprecated `pds-text-*` mixins, replaced by the documented `prose-text-*` mixins. */
export const textDeprecations = [
  {
    name: 'pds-text-x-large',
    raw: `  @include ${scssIdentifier(proseText['prose-text-xl'])};`,
    deprecation: { replacement: scssIdentifier(proseText['prose-text-xl']) },
  },
  {
    name: 'pds-text-large',
    raw: `  @include ${scssIdentifier(proseText['prose-text-lg'])};`,
    deprecation: { replacement: scssIdentifier(proseText['prose-text-lg']) },
  },
  {
    name: 'pds-text-medium',
    raw: `  @include ${scssIdentifier(proseText['prose-text-md'])};`,
    deprecation: { replacement: scssIdentifier(proseText['prose-text-md']) },
  },
  {
    name: 'pds-text-small',
    raw: `  @include ${scssIdentifier(proseText['prose-text-sm'])};`,
    deprecation: { replacement: scssIdentifier(proseText['prose-text-sm']) },
  },
  {
    name: 'pds-text-x-small',
    raw: `  @include ${scssIdentifier(proseText['prose-text-xs'])};`,
    deprecation: { replacement: scssIdentifier(proseText['prose-text-xs']) },
  },
  {
    name: 'pds-text-xx-small',
    raw: `  @include ${scssIdentifier(proseText['prose-text-2xs'])};`,
    deprecation: { replacement: scssIdentifier(proseText['prose-text-2xs']) },
  },
] satisfies DeprecatedScssMixin[];

/**
 * The deprecated `pds-display-*` mixins, routed through the `prose-heading-*` mixins of the separately
 * `@use`d `heading` partial — hence the namespaced `@include`.
 */
export const displayDeprecations = [
  {
    name: 'pds-display-large',
    raw: `  @include ${namespace.heading}.${proseHeading['prose-heading-5xl'].name};`,
    deprecation: { replacement: scssIdentifier(proseHeading['prose-heading-5xl']) },
  },
  {
    name: 'pds-display-medium',
    raw: `  @include ${namespace.heading}.${proseHeading['prose-heading-4xl'].name};`,
    deprecation: { replacement: scssIdentifier(proseHeading['prose-heading-4xl']) },
  },
  {
    name: 'pds-display-small',
    raw: `  @include ${namespace.heading}.${proseHeading['prose-heading-3xl'].name};`,
    deprecation: { replacement: scssIdentifier(proseHeading['prose-heading-3xl']) },
  },
] satisfies DeprecatedScssMixin[];

/** Deprecated typography mixins, grouped like the documented `typography` catalog. */
export const typographyDeprecations = {
  heading: headingDeprecations,
  text: textDeprecations,
  display: displayDeprecations,
};
