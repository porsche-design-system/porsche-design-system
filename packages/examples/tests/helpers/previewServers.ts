import path from 'node:path';
import { previewPort } from '../../plugins/projects.ts';

/**
 * The web server every Playwright suite of this package runs against.
 *
 * The suites test the **built** site, not the dev server: `dist-site/` is what the storefront serves, one
 * self-contained page per example, built from the generated project StackBlitz opens. The command is `npm run preview`,
 * the one a person starts as `npm run preview:examples`, so the inlined entries, the injected Porsche Design System
 * partials and the media paths are part of what is tested. The site itself is built by the `pretest:*` scripts
 * beforehand.
 *
 * `preview` runs `serve-cdn` next to the site, which the preview rewrites the production CDN URLs to. When port 3001 is
 * already taken, `serve-cdn` keeps idling instead of failing, so a dev session next to the test run is not a conflict.
 *
 * Shared by all three configs rather than written three times, because a port or a timeout drifting between them
 * would only show up as one suite silently testing a stale build.
 */

const packageDir = path.resolve(import.meta.dirname, '../..');

export const exampleWebServer = {
  command: 'npm run preview',
  port: previewPort,
  cwd: packageDir,
  reuseExistingServer: !process.env.CI,
  stdout: 'pipe' as const,
};
