import { initialStyles } from '@/lib/partialResults';
import { type PorscheDesignSystemBundle, getPorscheDesignSystemBundle, isReleasedPds } from '@/lib/stackblitz/helper';
import type { Framework } from '@/models/framework';
import type { StorefrontTheme } from '@/models/theme';
import { themeDark, themeLight } from '@porsche-design-system/components-js/styles';
import sdk, { type OpenOptions, type Project } from '@stackblitz/sdk';
import { devDependencies as devDependenciesRoot } from '../../../../../package.json';
import { dependencies as angularDependencies } from '../../../../components-angular/package.json';
import { dependencies } from '../../../../components-js/package.json';
import {
  dependencies as vueDependencies,
  devDependencies as vueDevDependencies,
} from '../../../../components-vue/package.json';

/* TODO:
 * - local development
 * - src/srcset transform?
 * - add dependencies
 * - add dir
 * - add text zoom
 **/
export const openInStackblitz = async (
  markup: string,
  framework: Exclude<Framework, 'next'>,
  theme: StorefrontTheme
) => {
  if (isReleasedPds()) {
    sdk.openProject(...stackblitzOptions[framework](markup, theme, undefined, ''));
  } else {
    // Use local bundle for non-released PDS versions
    const porscheDesignSystemBundle = await getPorscheDesignSystemBundle(framework);
    // Seems to be too many files for stackblitz to handle all styles thus we filter out vanilla-extract styles
    const minifiedBundle = Object.fromEntries(
      Object.entries(porscheDesignSystemBundle ?? {}).filter(([path]) => {
        return !path.includes('styles/vanilla-extract');
      })
    );
    sdk.openProject(...stackblitzOptions[framework](markup, theme, minifiedBundle, ''));
  }
};

const stackblitzOptions: Record<
  Exclude<Framework, 'next'>,
  (
    markup: string,
    theme: StorefrontTheme,
    porscheDesignSystemBundle: PorscheDesignSystemBundle | undefined,
    pdsVersion: string
  ) => [Project, OpenOptions]
> = {
  'vanilla-js': (markup, theme, porscheDesignSystemBundle, pdsVersion) => [
    {
      files: {
        ...porscheDesignSystemBundle,
        'index.html': markup,
        // Workaround to make local bundle work in stackblitz
        'index.js': isReleasedPds(pdsVersion)
          ? ''
          : `import * as porscheDesignSystem from './@porsche-design-system/components-js';
window.porscheDesignSystem = porscheDesignSystem;`,
      },
      template: 'javascript',
      title: 'Porsche Design System vanilla-js sandbox',
      description: 'Porsche Design System component example',
      dependencies: {
        ...(isReleasedPds(pdsVersion) && {
          '@porsche-design-system/components-js': pdsVersion || dependencies['@porsche-design-system/components-js'],
        }),
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
        'index.tsx': getIndexTsx(theme),
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
        // 'src/app/app.module.ts': getAppModuleTs(theme),
        'src/index.html': getAngularIndexHtml(theme),
        'src/main.ts': getMainTs(theme),
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
        'src/App.vue': getVueAppVue(theme),
        'src/Example.vue': markup,
        'src/main.ts': getVueMainTs(),
        'index.html': getVueIndexHTML(theme),
        'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
`,
        'package.json': JSON.stringify(
          {
            name: 'porsche-design-system-vue-example',
            private: true,
            version: '0.0.0',
            type: 'module',
            scripts: {
              dev: 'vite',
              build: 'vue-tsc && vite build',
              preview: 'vite preview',
            },
            stackblitz: {
              installDependencies: false, // disable initial `npm i`
              startCommand: 'yarn && yarn dev', // manually install dependencies and start app
            },
            dependencies: {
              '@porsche-design-system/components-vue': dependencies['@porsche-design-system/components-js'],
              vue: vueDependencies.vue,
            },
            devDependencies: {
              '@vitejs/plugin-vue': vueDevDependencies['@vitejs/plugin-vue'],
              '@vitejs/plugin-vue-jsx': vueDevDependencies['@vitejs/plugin-vue-jsx'],
              typescript: devDependenciesRoot.typescript,
              vite: devDependenciesRoot.vite,
              'vue-tsc': vueDevDependencies['vue-tsc'],
            },
          },
          null,
          2
        ),
      },
      template: 'node',
      title: 'Porsche Design System vue sandbox',
      description: 'Porsche Design System component example',
      dependencies: {
        '@porsche-design-system/components-vue': dependencies['@porsche-design-system/components-js'],
      },
    },
    {
      openFile: 'src/Example.vue',
    },
  ],
};

export const getVueAppVue = (theme: StorefrontTheme) => {
  return `<script setup lang="ts">
  import Example from './Example.vue';
  import { PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider${theme !== 'light' ? ` theme="${theme}"` : ''}>
    <Example />
  </PorscheDesignSystemProvider>
</template>`;
};

export const getVueMainTs = (): string => {
  return `import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.mount('#root');
`;
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

export const getMainTs = (theme: StorefrontTheme): string => {
  return `import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ExampleComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(ExampleComponent, {
  providers: [importProvidersFrom(PorscheDesignSystemModule${theme !== 'light' ? `.load({ theme: '${theme}' })` : ''})],
}).catch((err) => console.error(err));`;
};

export const getAppModuleTs = (theme: StorefrontTheme): string => {
  return `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ExampleComponent } from './app.component';

@NgModule({
  declarations: [ExampleComponent],
  imports: [BrowserModule, PorscheDesignSystemModule${theme !== 'light' ? `.load({ theme: '${theme}' })` : ''}], // <-- PDS module is imported here
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

export const getIndexTsx = (theme: StorefrontTheme): string => {
  return `import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

import { Example } from './Example';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <PorscheDesignSystemProvider${theme !== 'light' ? ` theme="${theme}"` : ''}>
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
