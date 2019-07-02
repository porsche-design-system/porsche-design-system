import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from "autoprefixer";
import { reactOutputTarget } from '@ionic-enterprise/react-output-plugin';
import { angularOutputTarget, ValueAccessorConfig } from '@ionic-enterprise/angular-output-plugin';

export const config: Config = {
  namespace: 'porsche-ui-kit',
  outputTargets: [
    { type: 'dist', esmLoaderPath: '../loader' },
    { type: 'docs-readme' },
    { type: 'www', serviceWorker: null },
    reactOutputTarget({
      componentCorePackage: "@porscheui/ui-kit-js",
      proxiesFile: '../ui-kit-react/src/components.ts'
    }),
    angularOutputTarget({
      componentCorePackage: "@porscheui/ui-kit-js",
      directivesProxyFile: '../ui-kit-angular/src/directives/proxies.ts'
    })
  ],
  plugins: [
    sass(),
    postcss({
      plugins: [autoprefixer()]
    })
  ],
  globalStyle: 'src/styles/common/index.scss'
};
