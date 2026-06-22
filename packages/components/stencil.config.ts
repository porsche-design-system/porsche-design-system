import { bundles } from '@porsche-design-system/shared';
import replace from '@rollup/plugin-replace';
import type { Config } from '@stencil/core';
import { version } from './package.json';

const isDevBuild = process.env.PDS_IS_STAGING === '1';

export const config: Config = {
  namespace: 'porsche-design-system',
  taskQueue: 'async',
  invisiblePrehydration: false, // done manually
  outputTargets: [
    { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null,
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
  rollupPlugins: {
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
  extras: {
    // emit lifecycle events like componentWillLoad, didLoad, willUpdate, didUpdate only in dev build for e2e tests
    ...(isDevBuild && { lifecycleDOMEvents: true }),
    tagNameTransform: true,
  },
};
