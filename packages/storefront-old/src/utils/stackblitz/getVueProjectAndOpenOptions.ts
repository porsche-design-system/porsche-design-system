import { initialStyles } from '@/lib/partialResults';
import { devDependencies as devDependenciesRoot } from '../../../../../package.json';
import { dependencies, devDependencies } from '../../../../components-vue/package.json';
import type { PlaygroundDir, StackBlitzProjectDependencies } from '../../models';
import type {
  DependencyMap,
  ExternalDependency,
  GetStackBlitzProjectAndOpenOptions,
  SharedImportKey,
} from '../../utils';
import { convertMarkup } from '../../utils/formatting';
import {
  convertImportPaths,
  getExternalDependencies,
  getSharedImportConstants,
  isStableStorefrontReleaseOrForcedPdsVersion,
  removeSharedImport,
} from './helper';

// TODO: this entire puzzle should be refactored into an object-oriented way so that there is a clear and clean structure
// as well as code flow, similar to our WrapperGenerator

export const extendExampleWithConstantsAndProvider = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = getSharedImportConstants(sharedImportKeys);

  return removeSharedImport(
    markup
      // add const definitions after last import statement
      .replace(/([\s\S]+import[\s\S]+?;)\n+/, `$1\n\n  ${sharedImportConstants.replace(/\n/g, '$&  ').trim()}\n\n`)
      // add PorscheDesignSystemProvider import
      .replace(/(?:,\s+)?(\s*} from '@porsche-design-system\/components-vue')/, ', PorscheDesignSystemProvider$1')
  ).replace(
    // wrap template in PorscheDesignSystemProvider
    /(<template>)([\s\S]+?)(<\/template>)/,
    (_, g1, g2, g3): string => `${g1}
  <PorscheDesignSystemProvider>

    ${g2.trim().replace(/\n/g, '$&  ')}

  </PorscheDesignSystemProvider>
${g3}`
  );
};

export const extendMarkupWithAppComponent = (markup: string): string => {
  const convertedMarkup = convertMarkup(markup, 'vue').replace(/\n/g, '$&    ');
  const vueComponentsToImport = Array.from(convertedMarkup.matchAll(/<(P[a-zA-Z]+)/g)) // returns array of all matches and captured groups
    .map(([, vueComponentName]) => vueComponentName)
    .filter((vueComponentName, idx, arr) => arr.findIndex((t) => t === vueComponentName) === idx) // remove duplicates
    .join(', ');

  return `<script setup lang="ts">
  import { ${vueComponentsToImport}, PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider>

    ${convertedMarkup}

  </PorscheDesignSystemProvider>
</template>
`;
};

export const getAppVue = (
  markup: string,
  isExampleMarkup: boolean,
  sharedImportKeys: SharedImportKey[],
  pdsVersion: string // eslint-disable-line @typescript-eslint/no-unused-vars
): string => {
  const finalMarkup = isExampleMarkup
    ? extendExampleWithConstantsAndProvider(markup, sharedImportKeys)
    : extendMarkupWithAppComponent(markup);

  // local bundle isn't supported because of missing COOP/COEP headers
  return process.env.NODE_ENV === 'production' ? convertImportPaths(finalMarkup, 'vue', pdsVersion) : finalMarkup;
};

export const getIndexHtml = (dir: PlaygroundDir, globalStyles: string) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - Vue</title>

    <!-- prettier-ignore -->
    ${initialStyles}

    <style>
      html, body { margin: 0; padding: 0; }
      ${globalStyles}
    </style>
  </head>
  <body dir="${dir}">
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`;
};

export const getMainTs = (): string => {
  return `import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.mount('#root');
`;
};

export const dependencyMap: Partial<DependencyMap<typeof dependencies & typeof devDependencies>> = {
  imask: {
    'vue-imask': dependencies['vue-imask'],
  },
  'ag-grid-community': {
    'ag-grid-community': devDependencies['ag-grid-community'],
  },
  'ag-grid-vue3': {
    'ag-grid-vue3': devDependencies['ag-grid-vue3'],
  },
};

export const getDependencies = (
  externalDependencies: ExternalDependency[],
  pdsVersion: string
): StackBlitzProjectDependencies => {
  return {
    // local bundle isn't supported because of missing COOP/COEP headers
    ...(process.env.NODE_ENV === 'production'
      ? isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) && {
          '@porsche-design-system/components-vue': pdsVersion || dependencies['@porsche-design-system/components-vue'],
        }
      : {
          '@porsche-design-system/components-vue': pdsVersion || dependencies['@porsche-design-system/components-vue'],
        }),
    vue: dependencies['vue'],
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const getDevDependencies = (): StackBlitzProjectDependencies => {
  return {
    '@vitejs/plugin-vue': devDependencies['@vitejs/plugin-vue'],
    '@vitejs/plugin-vue-jsx': devDependencies['@vitejs/plugin-vue-jsx'],
    typescript: devDependenciesRoot['typescript'],
    vite: devDependenciesRoot['vite'],
    'vue-tsc': devDependencies['vue-tsc'],
  };
};

export const getVueProjectAndOpenOptions: GetStackBlitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    dir,
    description,
    title,
    globalStyles,
    sharedImportKeys,
    externalDependencies,
    porscheDesignSystemBundle,
    pdsVersion,
  } = opts;

  // docs: https://developer.stackblitz.com/platform/webcontainers/project-config
  return {
    files: {
      // currently, requests from local CDN `localhost:3001` are blocked by webcontainers because of missing
      // COOP/COEP headers, therefore local bundle is not supported
      // https://webcontainers.io/guides/configuring-headers
      ...(process.env.NODE_ENV === 'production' && porscheDesignSystemBundle),
      'src/App.vue': getAppVue(markup, !!markup.match(/<script|<template/), sharedImportKeys, pdsVersion),
      'src/main.ts': getMainTs(),
      'index.html': getIndexHtml(dir, globalStyles),
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
          dependencies: getDependencies(externalDependencies, pdsVersion),
          devDependencies: getDevDependencies(),
        },
        null,
        2
      ),
    },
    template: 'node', // WebContainers environment, see: https://developer.stackblitz.com/platform/api/javascript-sdk-options#projecttemplate
    title,
    description,
    openFile: 'src/App.vue',
  };
};
