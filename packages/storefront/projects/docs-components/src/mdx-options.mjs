/**
 * The remark plugins every MDX page is compiled with, for the Storefront (`next.config.ts`) and the Markdown build
 * (`renderer/hooks.mjs`), so both outputs parse a page the same way. Listed by package name: with Turbopack, Next's MDX
 * loader only accepts serializable options, and the Markdown hook imports them by name.
 *
 * @type {string[]}
 */
export const remarkPlugins = ['remark-gfm'];
