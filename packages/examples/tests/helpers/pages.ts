import path from 'node:path';
import { findPages } from '../../plugins/jsx.ts';
import { getPageId, type ProjectCategory, previewPort } from '../../plugins/projects.ts';
import { examplesPath } from '../../src/_media.ts';

/**
 * The pages under test, derived from the source tree instead of from a list.
 *
 * Every `*.page.tsx` below a category becomes a generated project and a page of the built site, so globbing them is
 * the same enumeration the build does – a new example is covered by the VRT without anyone remembering to add it.
 */

const packageDir = path.resolve(import.meta.dirname, '../..');

export type ExamplePage = {
  category: ProjectCategory;
  /** Path of the page below its category, e.g. `'header/overlay'`. */
  pageDir: string;
  /** Stable name of the page across categories, and the prefix of its snapshots: `patterns-header-overlay`. */
  id: string;
  /**
   * Absolute URL on the preview server, below `/examples/` like in the storefront – `localhost`, not `127.0.0.1`:
   * `vite preview` binds to whatever the host resolves to first, which is the IPv6 loopback on macOS.
   */
  url: string;
};

export const getExamplePages = (): ExamplePage[] =>
  findPages(path.join(packageDir, 'src')).map((location) => ({
    ...location,
    id: getPageId(location),
    url: `http://localhost:${previewPort}${examplesPath}${location.category}/${location.pageDir}/`,
  }));

/**
 * The URL of an example, failing loudly if the page it names is gone.
 *
 * Each spec is written for exactly one page, so a page that is renamed or removed fails this lookup instead of
 * silently testing nothing.
 */
export const getExampleUrl = (id: string): string => {
  const examplePage = getExamplePages().find((page) => page.id === id);
  if (!examplePage) {
    throw new Error(`[examples] no example page "${id}" – rename the spec or remove it`);
  }
  return examplePage.url;
};

/**
 * Where the spec of an example lives in a suite: one file per page, below its category and relative to the `specs`
 * folder of that suite – `patterns/header-overlay.vrt.ts`.
 */
export const getSpecPath = ({ category, pageDir }: ExamplePage, suite: 'e2e' | 'a11y' | 'vrt'): string =>
  `${category}/${pageDir.replaceAll('/', '-')}.${suite}.ts`;
