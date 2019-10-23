import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget } from '@ionic-enterprise/react-output-plugin';
import { angularOutputTarget } from '@ionic-enterprise/angular-output-plugin';
import autoprefixer = require('autoprefixer');

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
      // TODO: temporary disable overwriting ui-kit-wrapper.component.ts to add manual adjustments
      // https://ioniccustomersuccess.slack.com/archives/GL2Q8P9T7/p1571060767006100
      directivesProxyFile: '../ui-kit-angular/projects/ui-kit-wrapper/src/lib/ui-kit-wrapper.component.generated.ts'
    })
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
