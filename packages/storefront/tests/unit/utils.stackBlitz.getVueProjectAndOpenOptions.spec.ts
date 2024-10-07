import {
  extendMarkupWithAppComponent,
  getDependencies,
  getVueProjectAndOpenOptions,
  extendExampleWithConstantsAndProvider,
  dependencyMap,
  getMainTs,
  getAppVue,
  getIndexHtml,
} from '../../src/utils/stackblitz/getVueProjectAndOpenOptions';
import type { SharedImportKey, StackBlitzFrameworkOpts, ExternalDependency } from '../../src/utils';
import * as getVueProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getVueProjectAndOpenOptions';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';
import { initialStyles } from '../../src/lib/partialResults';

jest.mock('../../../components-vue/package.json', () => ({
  dependencies: {
    '@porsche-design-system/components-vue': '0.0.0',
    'vue-imask': '0.0.0',
    vue: '0.0.0',
  },
  devDependencies: {
    'ag-grid-community': '0.0.0',
    'ag-grid-vue3': '0.0.0',
  },
}));

afterEach(() => {
  // reset to default
  process.env.NODE_ENV = 'test';
});

describe('extendExampleWithConstantsAndProvider()', () => {
  const markup = 'Some markup';
  const sharedImportKeys: SharedImportKey[] = [];

  it('should call getSharedImportConstants() with correct parameters', () => {
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants');

    extendExampleWithConstantsAndProvider(markup, sharedImportKeys);

    expect(spy).toHaveBeenCalledWith(sharedImportKeys);
  });

  it('should call removeSharedImport() with correct parameters', () => {
    const mockedReplaceValue = 'Some mocked markup';

    const spy = jest.spyOn(stackBlitzHelperUtils, 'removeSharedImport');
    jest.spyOn(String.prototype, 'replace').mockReturnValue(mockedReplaceValue);

    extendExampleWithConstantsAndProvider(markup, sharedImportKeys);

    expect(spy).toHaveBeenCalledWith(mockedReplaceValue);
  });

  it('should add single line import for PorscheDesignSystemProvider ', () => {
    const input = `<script setup lang="ts">
  import { PText } from '@porsche-design-system/components-vue';
</script>
`;

    const result = extendExampleWithConstantsAndProvider(input, sharedImportKeys);
    expect(result).toMatchSnapshot();
  });

  it('should add multi line import for PorscheDesignSystemProvider', () => {
    const input = `<script setup lang="ts">
  import {
    PTable,
    PTableBody,
  } from '@porsche-design-system/components-vue';
</script>
`;

    const result = extendExampleWithConstantsAndProvider(input, sharedImportKeys);
    expect(result).toMatchSnapshot();
  });

  it('should wrap template with PorscheDesignSystemProvider', () => {
    const input = `
<template>
  <PText>Hello</PText>
</template>
`;

    const result = extendExampleWithConstantsAndProvider(input, sharedImportKeys);
    expect(result).toMatchSnapshot();
  });
});

describe('extendMarkupWithAppComponent()', () => {
  const markup = 'Some Markup';

  it('should call convertMarkup() with correct parameters', () => {
    const spy = jest.spyOn(formattingUtils, 'convertMarkup');

    extendMarkupWithAppComponent(markup);

    expect(spy).toHaveBeenCalledWith(markup, 'vue');
  });

  it('should return correct app markup', () => {
    const mockedConvertedMarkup = `<PButton />
<PText>
  Some Text
</PText>
<PButton>
  <p>
    Some Text
  </p>
</PButton>
<button />`;
    jest.spyOn(formattingUtils, 'convertMarkup').mockReturnValue(mockedConvertedMarkup);

    expect(extendMarkupWithAppComponent(markup)).toMatchSnapshot();
  });
});

describe('getAppVue()', () => {
  it('should call convertImportPaths() for prod build', () => {
    process.env.NODE_ENV = 'production';
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');

    getAppVue('some markup', true, [], '');

    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call convertImportPaths() for dev/test build', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');

    getAppVue('some markup', true, [], '');

    expect(convertImportPathsSpy).not.toHaveBeenCalled();
  });

  it('should call convertImportPaths() + extendExampleWithConstantsAndProvider()', () => {
    const extendExampleWithConstantsAndProviderSpy = jest.spyOn(
      getVueProjectAndOpenOptionsUtils,
      'extendExampleWithConstantsAndProvider'
    );
    const extendMarkupWithAppComponentSpy = jest.spyOn(
      getVueProjectAndOpenOptionsUtils,
      'extendMarkupWithAppComponent'
    );

    getAppVue('some markup', true, [], '');

    expect(extendExampleWithConstantsAndProviderSpy).toHaveBeenCalledWith('some markup', []);
    expect(extendMarkupWithAppComponentSpy).not.toHaveBeenCalled();
  });

  it('should call convertImportPaths() + extendMarkupWithAppComponent()', () => {
    const extendExampleWithConstantsAndProviderSpy = jest.spyOn(
      getVueProjectAndOpenOptionsUtils,
      'extendExampleWithConstantsAndProvider'
    );
    const extendMarkupWithAppComponentSpy = jest.spyOn(
      getVueProjectAndOpenOptionsUtils,
      'extendMarkupWithAppComponent'
    );

    getAppVue('some markup', false, [], '');

    expect(extendExampleWithConstantsAndProviderSpy).not.toHaveBeenCalled();
    expect(extendMarkupWithAppComponentSpy).toHaveBeenCalledWith('some markup');
  });
});

describe('getMainTs()', () => {
  it('should return correct result', () => {
    expect(getMainTs()).toMatchSnapshot();
  });
});

describe('getIndexHtml()', () => {
  it('should return correct markup with styles', () => {
    expect(getIndexHtml('ltr', 'some styles')).toMatchSnapshot();
  });

  it('should return correct markup with styles and rtl mode', () => {
    expect(getIndexHtml('rtl', 'some styles')).toMatchSnapshot();
  });
});

describe('getDependencies()', () => {
  const expectedDefaultDependencies = {
    vue: '0.0.0',
  };

  const expectedDevDependencies = {
    '@vitejs/plugin-vue': '0.0.0',
    '@vitejs/plugin-vue-jsx': '0.0.0',
    typescript: '0.0.0',
    vite: '0.0.0',
    'vue-tsc': '0.0.0',
  };

  const expectedStableReleaseDependencies = {
    ...expectedDefaultDependencies,
    '@porsche-design-system/components-vue': '0.0.0',
  };

  it('should call getExternalDependencies() with correct parameters', () => {
    const externalDependencies: ExternalDependency[] = ['imask'];
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies');

    getDependencies(externalDependencies, '');

    expect(spy).toHaveBeenCalledWith(externalDependencies, dependencyMap);
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for stable storefront release (e.g. /v2/…, /v3/…)', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '')).toEqual({
      ...expectedStableReleaseDependencies,
      ...mockedDependency,
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for stable storefront release (e.g. /v2/…, /v3/…) and chosen pds version for bug reporting', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '1.2.3')).toEqual({
      ...expectedDefaultDependencies,
      ...mockedDependency,
      '@porsche-design-system/components-vue': '1.2.3',
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for production mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    process.env.NODE_ENV = 'production';
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '')).toEqual({
      ...expectedDefaultDependencies,
      ...mockedDependency,
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for development mode', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '')).toEqual({
      ...expectedStableReleaseDependencies,
      ...mockedDependency,
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for development mode or non stable storefront release (e.g. /issue/…, /release/…) and chosen pds version for bug reporting', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '1.2.3')).toEqual({
      ...expectedDefaultDependencies,
      ...mockedDependency,
      '@porsche-design-system/components-vue': '1.2.3',
    });
  });
});

describe('getVueProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    porscheDesignSystemBundle: {
      '@porsche-design-system/components-js/package.json': 'some package.json',
      '@porsche-design-system/components-vue/package.json': 'some package.json',
    },
    markup: 'Some markup',
    dir: 'ltr',
    description: 'Some description',
    title: 'Some title',
    globalStyles: 'body {}',
    externalDependencies: [],
    sharedImportKeys: [],
    pdsVersion: '',
  };

  it('should call several functions with correct parameters', () => {
    process.env.NODE_ENV = 'production';
    const isStableStorefrontReleaseSpy = jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease');
    const getAppVueSpy = jest.spyOn(getVueProjectAndOpenOptionsUtils, 'getAppVue');
    const getMainTsSpy = jest.spyOn(getVueProjectAndOpenOptionsUtils, 'getMainTs');
    const getDependenciesSpy = jest.spyOn(getVueProjectAndOpenOptionsUtils, 'getDependencies').mockReturnValue({});
    const getDevDependenciesSpy = jest
      .spyOn(getVueProjectAndOpenOptionsUtils, 'getDevDependencies')
      .mockReturnValue({});

    getVueProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(isStableStorefrontReleaseSpy).toHaveBeenCalled();
    expect(getAppVueSpy).toHaveBeenCalledWith(
      stackBlitzFrameworkOpts.markup,
      false,
      stackBlitzFrameworkOpts.sharedImportKeys,
      ''
    );
    expect(getMainTsSpy).toHaveBeenCalledWith();
    expect(getDependenciesSpy).toHaveBeenCalledWith(stackBlitzFrameworkOpts.externalDependencies, '');
    expect(getDevDependenciesSpy).toHaveBeenCalledWith();
  });

  it('should return correct StackBlitzProjectAndOpenOptions', () => {
    process.env.NODE_ENV = 'production';
    const mockedDependencies = { mockedDependency: '0.0.0' };
    const mockedDevDependencies = { mockedDevDependency: '0.0.0' };
    const mockedAppVue = 'Some mocked app markup';
    const mockedMainTs = 'Some mocked index markup';

    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    jest.spyOn(getVueProjectAndOpenOptionsUtils, 'getAppVue').mockReturnValue(mockedAppVue);
    jest.spyOn(getVueProjectAndOpenOptionsUtils, 'getMainTs').mockReturnValue(mockedMainTs);
    jest.spyOn(getVueProjectAndOpenOptionsUtils, 'getDependencies').mockReturnValue(mockedDependencies);
    jest.spyOn(getVueProjectAndOpenOptionsUtils, 'getDevDependencies').mockReturnValue(mockedDevDependencies);

    const result = getVueProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result).toEqual({
      files: {
        ...stackBlitzFrameworkOpts.porscheDesignSystemBundle,
        'src/App.vue': mockedAppVue,
        'src/main.ts': mockedMainTs,
        'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - Vue</title>

    <!-- prettier-ignore -->
    ${initialStyles}

    <style>
      html, body { margin: 0; padding: 0; }
      ${stackBlitzFrameworkOpts.globalStyles}
    </style>
  </head>
  <body dir="ltr">
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`,
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
              installDependencies: false, // disable npm i
              startCommand: 'yarn && yarn dev', // manually install dependencies and start app
            },
            dependencies: mockedDependencies,
            devDependencies: mockedDevDependencies,
          },
          null,
          2
        ),
      },
      template: 'node',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      openFile: 'src/App.vue',
    });
  });
});
