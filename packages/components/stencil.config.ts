import { Config } from '@stencil/core';
import { sass } from '@porsche-design-system/stencil-sass';
import { postcss } from '@stencil/postcss';
// @ts-ignore
import autoprefixer from 'autoprefixer';
import * as path from 'path';
import replace from '@rollup/plugin-replace';
import type { TagName } from '@porsche-design-system/shared';

/**
 * TODO: Remove this workaround
 * This is a temporary workaround to stop stencil from
 * messing up our dependencies by running an `npm` command.
 * Since we're heavily relying on yarn workspaces running
 * `npm` is leading to conflicts.
 * By adding a npm script to the PATH that does nothing
 * we can ensure, that our dependencies stay untouched.
 * https://github.com/porscheui/porsche-design-system/issues/318
 */
const fakeNpmPath = path.join(__dirname, 'scripts', 'fakenpm');
process.env.PATH = `${fakeNpmPath}:${process.env.PATH}`;

const isDevBuild = process.env.PDS_IS_STAGING === '1';

// specify chunking of components that can't be used standalone
// it's important to list the parent component first since it affects the chunk name
const bundles: { components: TagName[] }[] = [
  { components: ['p-banner', 'p-inline-notification'] },
  { components: ['p-button', 'p-button-group'] },
  { components: ['p-grid', 'p-grid-item'] },
  { components: ['p-flex', 'p-flex-item'] },
  { components: ['p-select-wrapper', 'p-select-wrapper-dropdown'] },
  {
    components: [
      'p-table',
      'p-table-body',
      'p-table-head',
      'p-table-head-row',
      'p-table-head-cell',
      'p-table-row',
      'p-table-cell',
    ],
  },
  { components: ['p-tabs', 'p-tabs-item'] },
  { components: ['p-text-list', 'p-text-list-item'] },
  { components: ['p-toast', 'p-toast-item'] },
];

export const config: Config = {
  namespace: 'porsche-design-system',
  taskQueue: 'async',
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
      ],
    },
  ],
  bundles,
  enableCache: true,
  plugins: [
    sass(),
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
  rollupPlugins: {
    after: [
      replace({
        ROLLUP_REPLACE_IS_STAGING: isDevBuild ? '"staging"' : '"production"',
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
