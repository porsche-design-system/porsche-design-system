import { initialStyles } from '@/lib/partialResults';
import type { Framework } from '@/models/framework';
import type { StorefrontTheme } from '@/models/theme';
import { themeDark, themeLight } from '@porsche-design-system/components-js/styles';
import sdk, { type OpenOptions, type Project } from '@stackblitz/sdk';
import { dependencies as angularDependencies } from '../../../../components-angular/package.json';
import { dependencies } from '../../../../components-js/package.json';

/* TODO:
 * - local development
 * - src/srcset transform?
 * - add dependencies
 * - add dir
 * - add text zoom
 **/
export const openInStackblitz = (markup: string, framework: Exclude<Framework, 'next'>, theme: StorefrontTheme) => {
  sdk.openProject(...stackblitzOptions[framework](markup, theme));
};

const stackblitzOptions: Record<
  Exclude<Framework, 'next'>,
  (markup: string, theme: StorefrontTheme) => [Project, OpenOptions]
> = {
  'vanilla-js': (markup) => [
    {
      files: {
        'index.html': markup,
        'index.js': '',
      },
      template: 'javascript',
      title: 'Porsche Design System vanilla-js sandbox',
      description: 'Porsche Design System component example',
      dependencies: {
        '@porsche-design-system/components-js': dependencies['@porsche-design-system/components-js'],
      },
    },
    {
      openFile: 'index.html',
    },
  ],
  react: (markup, theme) => [
    {
      files: {
        'Example.tsx': markup,
        'index.html': getIndexHtml(theme),
        'index.tsx': getIndexTsx(),
        'style.css': '', // empty file seems to be required
      },
      template: 'create-react-app',
      title: 'Porsche Design System react sandbox',
      description: 'Porsche Design System component example',
      dependencies: {
        '@porsche-design-system/components-react': dependencies['@porsche-design-system/components-js'],
      },
    },
    {
      openFile: 'App.tsx',
    },
  ],
  angular: (markup, theme) => [
    {
      files: {
        'src/app/app.component.ts': markup,
        'src/app/app.module.ts': getAppModuleTs(),
        'src/index.html': getAngularIndexHtml(theme),
        'src/main.ts': getMainTs(),
      },
      template: 'angular-cli',
      title: 'Porsche Design System angular sandbox',
      description: 'Porsche Design System component example',
      dependencies: {
        '@porsche-design-system/components-angular': dependencies['@porsche-design-system/components-js'],
        '@angular/animations': angularDependencies['@angular/animations'],
        '@angular/common': angularDependencies['@angular/common'],
        '@angular/compiler': angularDependencies['@angular/compiler'],
        '@angular/core': angularDependencies['@angular/core'],
        '@angular/forms': angularDependencies['@angular/forms'],
        '@angular/platform-browser': angularDependencies['@angular/platform-browser'],
        '@angular/platform-browser-dynamic': angularDependencies['@angular/platform-browser-dynamic'],
        '@angular/router': angularDependencies['@angular/router'],
        rxjs: angularDependencies.rxjs,
        tslib: angularDependencies.tslib,
        'zone.js': angularDependencies['zone.js'],
      },
    },
    {
      openFile: 'app.component.html',
    },
  ],
  vue: (markup, theme) => [
    {
      files: {
        'src/Example.vue': markup,
        'src/main.ts': `import { createApp } from 'vue';
import Example from './Example.vue';

const app = createApp(Example);

app.mount('#root');
`,
        'public/index.html': getVueIndexHTML(theme),
      },
      template: 'vue',
      title: 'Porsche Design System vue sandbox',
      description: 'Porsche Design System component example',
      dependencies: {
        '@porsche-design-system/components-vue': dependencies['@porsche-design-system/components-js'],
      },
    },
    {},
  ],
};

export const getVueIndexHTML = (theme: StorefrontTheme) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - Vue</title>

    ${initialStyles}
  ${getStackblitzGlobalStyle(theme)}

    <style>
      html, body { margin: 0; padding: 0; }
      body { background: #FFF; }
    </style>
  </head>
  <body dir="ltr">
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`;
};

export const getMainTs = (): string => {
  return `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));`;
};

export const getAppModuleTs = (): string => {
  return `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ExampleComponent } from './app.component';

@NgModule({
  declarations: [ExampleComponent],
  imports: [BrowserModule, PorscheDesignSystemModule], // <-- PDS module is imported here
  providers: [],
  bootstrap: [ExampleComponent],
})
export class AppModule {}
`;
};

export const getAngularIndexHtml = (theme: StorefrontTheme): string => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - Angular</title>
    ${initialStyles}
  ${getStackblitzGlobalStyle(theme)}
  </head>
  <body>
    <porsche-design-system-app></porsche-design-system-app>
  </body>
</html>`;
};

export const getIndexHtml = (theme: StorefrontTheme) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - React</title>
    ${initialStyles}
  ${getStackblitzGlobalStyle(theme)}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

export const getIndexTsx = (): string => {
  return `import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

import { Example } from './Example';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <PorscheDesignSystemProvider>
      <Example />
    </PorscheDesignSystemProvider>
  </StrictMode>
);
`;
};

export const getStackblitzGlobalStyle = (theme: StorefrontTheme) => {
  return `  <style>
${
  theme === 'auto'
    ? `    body { background: ${themeLight.background.base}; }
    @media (prefers-color-scheme: dark) {
      body { background: ${themeDark.background.base}; }
    }`
    : `    body { background: ${(theme === 'light' ? themeLight : themeDark).background.base}; }`
};
  </style>`;
};
