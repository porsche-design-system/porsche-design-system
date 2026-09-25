/**
 * The StackBlitz payload of a page: `stackblitz.json`, written next to its built `index.html`.
 *
 * It carries the generated project of the page verbatim – `package.json`, `vite.config.ts`, `index.html`, `main.js`,
 * `style.css` – so the storefront opens exactly what `scripts/buildSite.ts` built the framed page from. The shape is
 * what `sdk.openProject()` of `@stackblitz/sdk` takes, minus the options the storefront adds (`template`, `openFile`).
 *
 * Media are not part of it: the SDK accepts text files only, and the pages reference their media by `mediaPath`,
 * which the storefront resolves against its own deployment before it hands the files over (see `src/_media.ts`).
 */

export type StackblitzPayload = {
  title: string;
  description: string;
  /** Path inside the project → content. */
  files: Record<string, string>;
};

const decodeEntities = (value: string): string =>
  value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&');

const readTitle = (html: string): string | undefined => html.match(/<title>([\s\S]*?)<\/title>/)?.[1];

const readDescription = (html: string): string | undefined =>
  html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1];

/**
 * Builds the payload of a page from the files of its generated project.
 *
 * Title and description are taken from the page itself, the one place they are authored, so the StackBlitz project
 * is named like the page it was opened from.
 */
export const getStackblitzPayload = (files: Record<string, string>): StackblitzPayload => {
  const html = files['index.html'];
  const title = html && readTitle(html);
  const description = html && readDescription(html);

  if (!title || !description) {
    throw new Error('[examples] a generated project needs an index.html with a <title> and a description meta tag');
  }

  return { title: decodeEntities(title.trim()), description: decodeEntities(description.trim()), files };
};
