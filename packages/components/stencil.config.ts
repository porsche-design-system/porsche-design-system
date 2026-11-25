import replace from '@rollup/plugin-replace';
import type { Config } from '@stencil/core';
// Stencil 5 loads this config as ESM, where the barrel of @porsche-design-system/shared can't be loaded (its jss
// import has no ESM build), so the bundles come from their own module.
import { bundles } from '../shared/src/bundles';
import { version } from './package.json';

const isDevBuild = process.env.PDS_IS_STAGING === '1';

export const config: Config = {
  namespace: 'porsche-design-system',
  taskQueue: 'async',
  invisiblePrehydration: false, // done manually
  outputTargets: [
    // `dir` keeps the layout of Stencil 4 (`dist/esm`, `dist/cjs`, …) the build scripts and components-js rely on,
    // and the jsdom-polyfill needs the CommonJS build.
    { type: 'loader-bundle', dir: 'dist', cjs: true },
    // the readmes are no longer generated on their own, build:cleanReadmes turns them into the *.props.md files
    { type: 'docs-readme' },
    {
      type: 'www',
      copy: [
        {
          src: './favicon.ico',
          dest: 'favicon.ico',
        },
        {
          src: './debug.html',
          dest: 'debug.html',
        },
      ],
    },
  ],
  bundles,
  enableCache: true,
  rolldownPlugins: {
    after: [
      replace({
        preventAssignment: true,
        ROLLUP_REPLACE_IS_STAGING: isDevBuild ? '"staging"' : '"production"',
        ROLLUP_REPLACE_VERSION: `"${version}"`,
        ROLLUP_REPLACE_CDN_BASE_URL: isDevBuild
          ? '"http://localhost:3001"'
          : 'document.porscheDesignSystem.cdn.url + "/porsche-design-system"', // document variable is set via components-js load() call
      }),
    ],
  },
  globalScript: 'src/setup.ts',
  compat: {
    // emit lifecycle events like componentWillLoad, didLoad, willUpdate, didUpdate only in dev build for e2e tests
    ...(isDevBuild && { lifecycleDOMEvents: true }),
    // Opt-in in Stencil 4, on by default in Stencil 5. It adds one import per component to the runtime, and the
    // CommonJS build then calls a helper that doesn't exist (`_interopNamespace`), which breaks the jsdom-polyfill:
    // https://github.com/stenciljs/core/issues/7040
    enableImportInjection: false,
  },
};
