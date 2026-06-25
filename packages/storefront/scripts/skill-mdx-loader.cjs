const fs = require('node:fs');
const { compileSync } = require('@mdx-js/mdx');
const remarkGfm = require('remark-gfm').default || require('remark-gfm');
const esbuild = require('esbuild');

/**
 * MDX runtime for the build:skill generator, loaded via
 * `node --import tsx --require ./scripts/skill-mdx-loader.cjs`. It teaches the
 * generator to `require` the same `page.mdx` modules Next serves — mirroring
 * `next.config.ts` (`remark-gfm`, automatic React JSX runtime) — then render them
 * to markdown. Registered as a CommonJS `require` extension so the whole MDX graph
 * (component meta, partials, migration) shares tsx's require resolution.
 *
 * `@mdx-js/mdx` emits ESM; esbuild transpiles it to CJS so it slots into that graph,
 * where the MDX's own `@/`-aliased imports resolve through tsx.
 */
require.extensions['.mdx'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const esm = String(compileSync(source, { remarkPlugins: [remarkGfm] }));
  const cjs = esbuild.transformSync(esm, { loader: 'js', format: 'cjs', target: 'node20' }).code;
  module._compile(cjs, filename);
};
