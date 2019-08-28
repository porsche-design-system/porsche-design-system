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
          src: require.resolve('@porsche-ui/utils/dist/components-overview.css'),
          dest: 'components-overview.css'
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
    })
  ],
  plugins: [
    sass(),
    postcss({
      plugins: [autoprefixer()]
    })
  ],
  globalStyle: 'src/styles/index.scss'
};
