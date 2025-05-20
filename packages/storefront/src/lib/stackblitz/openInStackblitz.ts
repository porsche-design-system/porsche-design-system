import { initialStyles } from '@/lib/partialResults';
import {
  type PorscheDesignSystemBundle,
  convertImportPaths,
  getPorscheDesignSystemBundle,
  isReleasedPds,
} from '@/lib/stackblitz/helper';
import type { StorefrontTheme } from '@/models/theme';
import { themeDark, themeLight } from '@porsche-design-system/components-js/styles';
import type { Framework } from '@porsche-design-system/shared';
import sdk, { type OpenOptions, type Project } from '@stackblitz/sdk';
import rootPkg from '../../../../../package.json';
import angularPkg from '../../../../components-angular/package.json';
import jsPkg from '../../../../components-js/package.json';
import vuePkg from '../../../../components-vue/package.json';
import { openInStackblitz2 } from '../../../../stackblitz/scripts/openInStackblitz';

const devDependenciesRoot = rootPkg.devDependencies;
const angularDependencies = angularPkg.dependencies;
const dependencies = jsPkg.dependencies;
const vueDependencies = vuePkg.dependencies;
const vueDevDependencies = vuePkg.devDependencies;

/* TODO:
 * - local development not working for angular/vue
 * - src/srcset transform? local images?
 * - add dependencies
 * - add dir
 * - add text zoom
 **/
export const openInStackblitz = async (
  markup: string,
  framework: Framework,
  theme: StorefrontTheme,
  pdsVersion?: string
) => {
  openInStackblitz2(markup);
};

const stackblitzOptions: Record<
  Exclude<Framework, 'next'>,
  (
    markup: string,
    theme: StorefrontTheme,
    porscheDesignSystemBundle: PorscheDesignSystemBundle | undefined,
    pdsVersion: string | undefined
  ) => [Project, OpenOptions]
> = {
  'vanilla-js': (markup, _, porscheDesignSystemBundle, pdsVersion) => [
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
  react: (markup, theme, porscheDesignSystemBundle, pdsVersion) => [
    {
      files: {
        ...porscheDesignSystemBundle,
        'Example.tsx': porscheDesignSystemBundle ? convertImportPaths(markup, 'react') : markup,
        'index.html': getReactIndexHtml(theme),
        'index.tsx': getReactIndexTsx(theme, !!porscheDesignSystemBundle),
        'style.css': '', // empty file seems to be required
      },
      template: 'create-react-app',
      title: 'Porsche Design System react sandbox',
      description: 'Porsche Design System component example',
      dependencies: {
        ...(isReleasedPds(pdsVersion) && {
          '@porsche-design-system/components-react': pdsVersion || dependencies['@porsche-design-system/components-js'],
        }),
      },
    },
    {
      openFile: 'Example.tsx',
    },
  ],
  angular: (markup, theme, porscheDesignSystemBundle, pdsVersion) => [
    {
      files: {
        ...porscheDesignSystemBundle,
        'src/app/app.component.ts': `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
<h1 class="text-red-500">Test</h1>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ExampleComponent {}`,
        'src/index.html': getAngularIndexHtml(theme),
        'src/main.ts': getAngularMainTs(theme, !!porscheDesignSystemBundle),
        'src/styles.css': `@import "tailwindcss";
@import "@porsche-design-system/components-angular/tailwindcss";`,
        '.postcssrc.json': `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`,
        'package.json': JSON.stringify(
          {
            name: 'porsche-design-system-angular-example',
            private: true,
            version: '0.0.0',
            type: 'module',
            scripts: {
              ng: 'ng',
              start: 'ng serve',
              build: 'ng build',
              watch: 'ng build --watch --configuration development',
              test: 'ng test',
            },
            dependencies: {
              '@angular/common': '^19.2.0',
              '@angular/compiler': '^19.2.0',
              '@angular/core': '^19.2.0',
              '@angular/forms': '^19.2.0',
              '@angular/platform-browser': '^19.2.0',
              '@angular/platform-browser-dynamic': '^19.2.0',
              '@angular/router': '^19.2.0',
              '@porsche-design-system/components-angular': '^3.28.0-rc.3',
              '@tailwindcss/postcss': '^4.1.7',
              postcss: '^8.5.3',
              rxjs: '~7.8.0',
              tailwindcss: '^4.1.7',
              tslib: '^2.3.0',
              'zone.js': '~0.15.0',
            },
            devDependencies: {
              '@angular-devkit/build-angular': '^19.2.12',
              '@angular/cli': '^19.2.12',
              '@angular/compiler-cli': '^19.2.0',
              '@types/jasmine': '~5.1.0',
              'jasmine-core': '~5.6.0',
              karma: '~6.4.0',
              'karma-chrome-launcher': '~3.2.0',
              'karma-coverage': '~2.2.0',
              'karma-jasmine': '~5.1.0',
              'karma-jasmine-html-reporter': '~2.1.0',
              typescript: '~5.7.2',
            },
          },
          null,
          2
        ),
        'angular.json': `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "demo": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/demo",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "demo:build:production"
            },
            "development": {
              "buildTarget": "demo:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          }
        }
      }
    }
  }
}`,
        'tsconfig.app.json': `/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}`,
        'tsconfig.json': `/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}`,
      },
      template: 'node',
      title: 'Porsche Design System angular sandbox',
      description: 'Porsche Design System component example',
      // dependencies: {
      //   ...(isReleasedPds(pdsVersion) && {
      //     '@porsche-design-system/components-angular':
      //       pdsVersion || dependencies['@porsche-design-system/components-js'],
      //   }),
      //   '@angular/animations': angularDependencies['@angular/animations'],
      //   '@angular/common': angularDependencies['@angular/common'],
      //   '@angular/compiler': angularDependencies['@angular/compiler'],
      //   '@angular/core': angularDependencies['@angular/core'],
      //   '@angular/forms': angularDependencies['@angular/forms'],
      //   '@angular/platform-browser': angularDependencies['@angular/platform-browser'],
      //   '@angular/platform-browser-dynamic': angularDependencies['@angular/platform-browser-dynamic'],
      //   '@angular/router': angularDependencies['@angular/router'],
      //   rxjs: angularDependencies.rxjs,
      //   tslib: angularDependencies.tslib,
      //   'zone.js': angularDependencies['zone.js'],
      //   tailwindcss: devDependenciesRoot.tailwindcss,
      //   '@tailwindcss/postcss': devDependenciesRoot['@tailwindcss/postcss'],
      //   postcss: devDependenciesRoot.postcss,
      // },
    },
    {
      openFile: 'app.component.html',
    },
  ],
  vue: (markup, theme, porscheDesignSystemBundle) => [
    {
      files: {
        ...porscheDesignSystemBundle,
        'src/App.vue': getVueAppVue(theme),
        'src/Example.vue': porscheDesignSystemBundle ? convertImportPaths(markup, 'vue') : markup,
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

export const getVueAppVue = (theme: StorefrontTheme, isLocalPdsBundle: boolean = false) => {
  return `<script setup lang="ts">
  import Example from './Example.vue';
  import { PorscheDesignSystemProvider } from '${isLocalPdsBundle ? './../' : ''}@porsche-design-system/components-vue';
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
  </head>
  <body dir="ltr">
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`;
};

export const getAngularMainTs = (theme: StorefrontTheme, isLocalPdsBundle: boolean = false): string => {
  return `import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { ExampleComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(ExampleComponent).catch((err) => console.error(err));`;
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

export const getReactIndexHtml = (theme: StorefrontTheme) => `<!doctype html>
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

export const getReactIndexTsx = (theme: StorefrontTheme, isLocalPdsBundle: boolean = false): string => {
  return `import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PorscheDesignSystemProvider } from '${isLocalPdsBundle ? './' : ''}@porsche-design-system/components-react';

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
