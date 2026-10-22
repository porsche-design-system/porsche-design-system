/**
 * JSX typings for the Porsche Design System web components (`<p-button>`, `<p-link>`, …).
 *
 * The pages here are TSX rendered to static HTML, so the PDS components are used as plain custom elements loaded from
 * the CDN – there is no framework wrapper involved (see AGENTS.md, "Scope discipline"). Preact therefore has no idea
 * that `p-button` exists and rejects it as an unknown intrinsic element.
 *
 * Rather than hand-maintaining a list of ~90 components, the tag names and their props are derived from the Stencil
 * types that `@porsche-design-system/components` generates. That import is **type-only**: with `verbatimModuleSyntax`
 * it is erased completely, so nothing from the core package reaches the rendered output.
 *
 * The important twist is that this package renders **static HTML, not a DOM tree**: nothing sets JS properties on the
 * elements afterwards. So what is typed here are *attributes*, not properties – kebab-cased (`hide-label`, not
 * `hideLabel`) and restricted to values that survive HTML serialization.
 */
import type {} from '@porsche-design-system/components';
import type { JSX } from 'preact';

/**
 * `hideLabel` → `hide-label`. Characters that are already lowercase (this includes digits) are kept as they are,
 * everything else starts a new dash-separated word.
 */
type CamelToKebabCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Head extends Lowercase<Head>
    ? `${Head}${CamelToKebabCase<Tail>}`
    : `-${Lowercase<Head>}${CamelToKebabCase<Tail>}`
  : '';

/**
 * Every PDS component registers itself in `HTMLElementTagNameMap`, so the tag names come from there instead of from a
 * list that would have to be kept in sync. No native element starts with `p-`, so the prefix is unambiguous.
 */
type PdsTagName = Extract<keyof HTMLElementTagNameMap, `p-${string}`>;

/**
 * The Stencil element interfaces extend `HTMLElement`, so the inherited DOM members are subtracted to leave the props
 * the component actually declares. `componentOnReady` is Stencil's own addition and is not an attribute either.
 */
type PdsProps<TagName extends PdsTagName> = Pick<
  HTMLElementTagNameMap[TagName],
  Exclude<keyof HTMLElementTagNameMap[TagName], keyof HTMLElement | 'componentOnReady'>
>;

/**
 * Narrows a prop type to what can be written as an HTML attribute.
 *
 * String and number unions survive as they are, which keeps the useful autocompletion (`variant="primary"`). Booleans
 * stay booleans, because Preact omits the attribute for `false` and renders a bare attribute for `true`. Anything
 * structural – the object half of `BreakpointCustomizable`, the `aria` record – can only be expressed as a JSON string
 * in markup, so `string` is added for those.
 */
type AttributeValue<T> =
  | Extract<NonNullable<T>, string | number | boolean>
  | ([Exclude<NonNullable<T>, string | number | boolean>] extends [never] ? never : string);

/** All props of one component as optional, kebab-cased, attribute-serializable values. */
type PdsAttributes<TagName extends PdsTagName> = {
  [Prop in keyof PdsProps<TagName> as Prop extends string ? CamelToKebabCase<Prop> : never]?: AttributeValue<
    PdsProps<TagName>[Prop]
  >;
};

/**
 * The component attributes win over the generic HTML ones where they overlap (`type`, `name`, `value`, `disabled`, …),
 * so the narrower PDS union is what gets checked.
 */
type PdsIntrinsicElements = {
  [TagName in PdsTagName]: Omit<JSX.HTMLAttributes<HTMLElement>, keyof PdsAttributes<TagName>> & PdsAttributes<TagName>;
};

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements extends PdsIntrinsicElements {}
  }
}
