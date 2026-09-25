import path from 'node:path';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import { pageSuffix } from '../../../plugins/jsx.ts';
import { getPageId, type ProjectCategory, previewPort, resolvePageLocation } from '../../../plugins/projects.ts';
import { examplesPath } from '../../../src/_media.ts';

/**
 * The pages under test, derived from the source tree instead of from a list.
 *
 * Every `*.page.tsx` below a category becomes a generated project and a page of the built site, so globbing them is
 * the same enumeration the build does – a new example is covered by the VRT without anyone remembering to add it.
 */

const packageDir = path.resolve(import.meta.dirname, '../../..');

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
  fastGlob
    .sync(`**/*${pageSuffix}`, { cwd: path.join(packageDir, 'src'), onlyFiles: true })
    .sort()
    .flatMap((relativePath) => {
      const location = resolvePageLocation(relativePath);
      // `src/index.page.tsx` is the overview of the source tree – it belongs to no category and is never emitted.
      if (!location) {
        return [];
      }

      return [
        {
          ...location,
          id: getPageId(location),
          url: `http://localhost:${previewPort}${examplesPath}${location.category}/${location.pageDir}/`,
        },
      ];
    });
