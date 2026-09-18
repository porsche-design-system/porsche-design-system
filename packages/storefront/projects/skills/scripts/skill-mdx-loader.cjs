const fs = require('node:fs');
const Module = require('node:module');

/**
 * Runtime shims for the build:skills generator, loaded via
 * `node --import tsx --require ./scripts/skill-mdx-loader.cjs`. It does two things so the generator
 * can run without any built framework wrapper (`components-js/react/vue/angular`) present:
 *
 * 1. Stubs the wrapper packages. The generator only reads static data from the storefront docs — MDX
 *    prose and each example's pre-generated `frameworkMarkup` code strings. The example modules also
 *    export a live React `component` that imports the wrappers, but the generator never renders it, so
 *    those imports are resolved to an inert stub instead of the (possibly unbuilt) wrapper dist.
 * 2. Turns each `.mdx` into its parsed mdast tree rather than a compiled React component: the prose is
 *    serialized to markdown structurally (see `renderMdxToMarkdown.ts`), so the MDX's own imports
 *    (e.g. `TableOfContents` → the react wrapper) are parsed but never executed.
 */

/** Any subpath of the four framework wrappers — the packages the skill build must not need built. */
const WRAPPER_SPECIFIER = /^@porsche-design-system\/components-(?:react|js|vue|angular)(?:\/.*)?$/;

/** Callable, property-any stub: works as a default import, a named import and a React component. */
const wrapperStub = new Proxy(
  function wrapperStub() {
    return null;
  },
  {
    get(_target, property) {
      if (property === '__esModule') {
        return true;
      }
      if (typeof property === 'symbol' || property === 'then') {
        return undefined;
      }
      return wrapperStub;
    },
    apply() {
      return null;
    },
  }
);

const originalLoad = Module._load;
Module._load = function (...args) {
  const [request] = args;
  if (typeof request === 'string' && WRAPPER_SPECIFIER.test(request)) {
    return wrapperStub;
  }
  return originalLoad.apply(this, args);
};

// tsx is active by the time this handler runs (during the MDX-importing `components.meta` load), so
// the TypeScript parser module resolves here.
require.extensions['.mdx'] = (module, filename) => {
  const { parseMdxToMdast } = require('../src/knowledge/mdx/renderMdxToMarkdown');
  module.exports = { __esModule: true, default: parseMdxToMdast(fs.readFileSync(filename, 'utf8')) };
};
