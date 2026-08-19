import { createRequire } from 'node:module';
import path from 'node:path';

/**
 * Resolves the styling packages' installed roots so the collectors can read the artifacts a consumer
 * actually gets — the tokens meta, the stylesheets and the partials — rather than reaching across
 * the monorepo by relative path.
 *
 * Each package exposes a `./skill` subpath (the `PackageSkill` fragment the knowledge references are
 * built from), which is used purely as a resolution anchor: it is the one entry point every styling
 * package exports, so `<root>/skill/skill.ts` locates the root without depending on a package.json
 * `exports` map that does not publish `package.json` itself.
 */
const require = createRequire(import.meta.url);

const packageRoot = (specifier: string): string => path.dirname(path.dirname(require.resolve(`${specifier}/skill`)));

export const tokensMetaRoot = (): string => packageRoot('@porsche-design-system/tokens-meta');
export const stylesheetsRoot = (): string => packageRoot('@porsche-design-system/stylesheets');

/**
 * The partials package has no `./skill` subpath, so it is anchored on its `package.json` instead.
 *
 * Every root here resolves to a workspace *source* directory that exists before `build:skills` runs.
 * That matters: the repository build order is `styles` → `components` → **skills** → `components-js`,
 * so anything read out of `packages/components-js/dist` would be absent on a clean build.
 */
export const partialsRoot = (): string => path.dirname(require.resolve('@porsche-design-system/partials/package.json'));
