import * as path from 'node:path';
import type { TagName } from '@porsche-design-system/shared';
import replace from '@rollup/plugin-replace';
import type { Config } from '@stencil/core';
import { version } from './package.json';

/**
 * TODO: Remove this workaround
 * This is a temporary workaround to stop stencil from
 * messing up our dependencies by running an `npm` command.
 * Since we're heavily relying on yarn workspaces running
 * `npm` is leading to conflicts.
 * By adding a npm script to the PATH that does nothing
 * we can ensure, that our dependencies stay untouched.
 * https://github.com/porsche-design-system/porsche-design-system/issues/318
 */
const fakeNpmPath = path.join(__dirname, 'scripts', 'fakenpm');
process.env.PATH = `${fakeNpmPath}:${process.env.PATH}`;

const isDevBuild = process.env.PDS_IS_STAGING === '1';

// specify chunking of components that can't be used standalone
// it's important to list the parent component first since it affects the chunk name
export const bundles: { components: TagName[] }[] = [
  { components: ['p-drilldown', 'p-drilldown-item', 'p-drilldown-link'] },
  { components: ['p-multi-select', 'p-multi-select-option'] },
  { components: ['p-segmented-control', 'p-segmented-control-item'] },
  { components: ['p-radio-group', 'p-radio-group-option'] },
  { components: ['p-select', 'p-select-option'] },
  { components: ['p-stepper-horizontal', 'p-stepper-horizontal-item'] },
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
