import path from 'node:path';
import { projects as exampleProjects } from '../../plugins/projects.ts';

/**
 * The web servers every Playwright suite of this package runs against.
 *
 * The suites test the **built** projects, not the dev server: `dist/` is source, and what the examples repository
 * ships is the result of building it. The servers below are therefore the same `vite build` + `vite preview` that
 * `npm run preview:examples/*` runs, so the bundled entries, the injected Porsche Design System partials and the
 * copied stylesheet are part of what is tested.
 *
 * Shared by the VRT and the a11y config rather than written twice, because a port or a timeout drifting between the
 * two would only show up as one suite silently testing a stale build.
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

/** One preview server per category, each serving the built project of that category on its own port. */
const previewServers = exampleProjects.map(({ category, previewPort }) => ({
  command: `npm run preview:${category}:app`,
  port: previewPort,
  cwd: packageDir,
  // Each server builds its project first, which is a full `vite build` – well beyond Playwright's default timeout.
  timeout: 300_000,
  reuseExistingServer: !process.env.CI,
  stdout: 'pipe' as const,
}));

export const exampleWebServers = [cdnServer, ...previewServers];
