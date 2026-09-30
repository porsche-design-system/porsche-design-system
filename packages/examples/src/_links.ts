/**
 * The href of every link that exists to be seen rather than followed.
 *
 * The examples demonstrate chrome, they are not a website, so their navigations point nowhere – only the overview of
 * the dev server links for real. It is a constant, not a literal in the markup, for two reasons: it names the intent at
 * each call site, and Biome's `a11y/useValidAnchor` rule rejects a literal `"#"` – rightly so in an application, where
 * such a link is usually a button in disguise. Here the links are the demonstration.
 */
export const placeholderHref = '#';

/** A link of the demo chrome – `placeholderHref`, unless it points at an id on the same page. */
export type LinkItem = {
  href: string;
  label: string;
};
