import { createRequire } from 'node:module';
import path from 'node:path';

/**
 * Resolves the partials package's installed root so the collector can read the artifact a consumer
 * actually gets, rather than reaching across the monorepo by relative path.
 *
 * The partials package has no `./skill` subpath the other packages are anchored on, so it is
 * anchored on its `package.json` instead.
 *
 * The root resolves to a workspace *source* directory that exists before `build:skills` runs. That
 * matters: the repository build order is `styles` → `components` → **skills** → `components-js`, so
 * anything read out of `packages/components-js/dist` would be absent on a clean build.
 */
const require = createRequire(import.meta.url);

export const partialsRoot = (): string => path.dirname(require.resolve('@porsche-design-system/partials/package.json'));
