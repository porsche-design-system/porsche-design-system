import path from 'node:path';
import { previewPort } from '../../plugins/projects.ts';

/**
 * The web servers every Playwright suite of this package runs against.
 *
 * The suites test the **built** site, not the dev server: `dist-site/` is what the storefront serves, one
 * self-contained page per example, built from the generated project StackBlitz opens. The servers below are the same
 * ones `npm run preview:examples` starts, so the inlined entries, the injected Porsche Design System partials and the
 * media paths are part of what is tested. The site itself is built by the `pretest:*` scripts beforehand.
 *
 * Shared by all three configs rather than written three times, because a port or a timeout drifting between them
 * would only show up as one suite silently testing a stale build.
 */

const packageDir = path.resolve(import.meta.dirname, '../..');

/**
 * Serves the locally built components, which the preview rewrites the production CDN URLs to.
 *
 * Keeps running when the port is already taken, so a dev session next to the test run is not a conflict.
 */
const cdnServer = {
  command: 'serve-cdn',
  port: 3001,
  cwd: packageDir,
  reuseExistingServer: true,
};

/** Serves `dist-site/` below `/examples/`, the way the storefront serves `public/examples/`. */
const siteServer = {
  command: 'npm run preview:app',
  port: previewPort,
  cwd: packageDir,
  reuseExistingServer: !process.env.CI,
  stdout: 'pipe' as const,
};

export const exampleWebServers = [cdnServer, siteServer];
