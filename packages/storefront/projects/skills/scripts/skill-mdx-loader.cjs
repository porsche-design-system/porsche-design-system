const fs = require('node:fs');

/**
 * Runtime shim for the build:skills generator, loaded via
 * `node --import tsx --require ./scripts/skill-mdx-loader.cjs`. It turns each `.mdx` into its parsed
 * mdast tree rather than a compiled React component: the prose is serialized to markdown structurally
 * (see `renderMdxToMarkdown.ts`), so the MDX's own imports (e.g. `TableOfContents` → the react
 * wrapper) are parsed but never executed.
 *
 * Everything else the generator loads is data and needs no built framework wrapper; a test of the
 * skills project (`tests/specs/gates/wrapperFree.spec.ts`) fails as soon as it requests one.
 */

// tsx is active by the time this handler runs (during the MDX-importing `components.meta` load), so
// the TypeScript parser module resolves here.
require.extensions['.mdx'] = (module, filename) => {
  const { parseMdxToMdast } = require('../src/knowledge/mdx/renderMdxToMarkdown');
  module.exports = { __esModule: true, default: parseMdxToMdast(fs.readFileSync(filename, 'utf8')) };
};
