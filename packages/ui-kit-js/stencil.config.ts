import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import autoprefixer = require('autoprefixer');
import path = require('path');

/**
 * TODO: Remove this workaround
 * This is a temporary workaround to stop stencil from
 * messing up our dependencies by running an `npm` command.
 * Since we're heavily relying on yarn workspaces running
 * `npm` is leading to conflicts.
 * By adding a npm script to the PATH that does nothing
 * we can ensure, that our dependencies stay untouched.
 * https://github.com/porscheui/porsche-ui-kit/issues/318
 */
const fakeNpmPath = path.join(__dirname, 'scripts', 'fakenpm');
process.env.PATH = `${fakeNpmPath}:${process.env.PATH}`;

export const config: Config = {
  namespace: 'porsche-ui-kit',
  outputTargets: [
    { type: 'dist', esmLoaderPath: '../loader' },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: require.resolve('@porsche-ui/utils/dist/visual-regression-test.css'),
          dest: 'visual-regression-test.css'
        },
        {
          src: './favicon.ico',
          dest: 'favicon.ico'
        }
      ]
    },
    reactOutputTarget({
      componentCorePackage: '@porsche-ui/ui-kit-js',
      proxiesFile: '../ui-kit-react/projects/ui-kit-wrapper/src/lib/components.ts'
    }),
    angularOutputTarget({
      componentCorePackage: '@porsche-ui/ui-kit-js',
      directivesProxyFile: '../ui-kit-angular/projects/ui-kit-wrapper/src/lib/ui-kit-wrapper.component.ts'
    }),
  ],
  bundles: [
    {components: []}
  ],
  plugins: [
    sass(),
    postcss({
      plugins: [autoprefixer()]
    })
  ],
  globalStyle: 'src/styles/index.scss',
  testing: {
    globalSetup: './jest.setup',
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process'],
  }
};
