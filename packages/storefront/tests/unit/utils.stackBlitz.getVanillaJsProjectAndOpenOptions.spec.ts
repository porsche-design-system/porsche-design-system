import {
  dependencyMap,
  getExtendedMarkupWithLoadFunction,
  getIndexHtml,
  getDependencies,
  getVanillaJsProjectAndOpenOptions,
  replaceSharedAsyncFunctionWithConstants,
  getIndexJs,
} from '../../src/utils/stackblitz/getVanillaJsProjectAndOpenOptions';
import { getSharedImportConstants } from '../../src/utils/stackblitz/helper';
import type { SharedImportKey, StackBlitzFrameworkOpts, ExternalDependency } from '../../src/utils';

import * as getVanillaJsProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getVanillaJsProjectAndOpenOptions';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';

jest.mock('../../../components-js/package.json', () => ({
  dependencies: {
    imask: '0.0.0',
    '@porsche-design-system/components-js': '0.0.0',
  },
  devDependencies: {
    'ag-grid-community': '0.0.0',
  },
}));

describe('getExtendedMarkupWithLoadFunction()', () => {
  describe('development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);
    });

    it('should return markup and script tag without load() call', () => {
      const markup = '<p-button>SomeButton</p-button>\n<script>console.log()</script>';

      expect(getExtendedMarkupWithLoadFunction(markup)).toMatchSnapshot();
    });

    it('should return markup without load() call', () => {
      const markup = '<p-button>Some snippet</p-button>';

      expect(getExtendedMarkupWithLoadFunction(markup)).toMatchSnapshot();
    });
  });

  describe('stable storefront release (e.g. /v2/…, /v3/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    });

    it('should return markup and load() call within existing script tag', () => {
      const markup = '<p-button>SomeButton</p-button>\n<script>console.log()</script>';

      expect(getExtendedMarkupWithLoadFunction(markup)).toMatchSnapshot();
    });

    it('should return markup and load() call within its own script tag', () => {
      const markup = '<p-button>Some snippet</p-button>';

      expect(getExtendedMarkupWithLoadFunction(markup)).toMatchSnapshot();
    });
  });
});

describe('replaceSharedAsyncFunctionWithConstants()', () => {
  const markup = 'Some markup';
  const sharedImportKeys: SharedImportKey[] = [];

  it('should call getSharedImportConstants() with correct parameters', () => {
    const sharedImportKeys: SharedImportKey[] = [];
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants');

    replaceSharedAsyncFunctionWithConstants(markup, sharedImportKeys);

    expect(spy).toHaveBeenCalledWith(sharedImportKeys);
  });

  it('should call replace() with correct parameters', () => {
    const sharedImportKeys: SharedImportKey[] = [];
    const getSharedImportConstantsMock = 'Some mock value';
    const replaceMockValue = 'Some mock value';

    const spy = jest.spyOn(String.prototype, 'replace').mockReturnValue(replaceMockValue);
    jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants').mockReturnValue(getSharedImportConstantsMock);

    expect(replaceSharedAsyncFunctionWithConstants(markup, sharedImportKeys)).toBe(replaceMockValue);
    expect(spy).toHaveBeenCalledWith(/const { .* } = await [a-zA-Z]+\(\);/, getSharedImportConstantsMock);
  });

  it('should return unmodified markup parameter if regex does not match', () => {
    expect(replaceSharedAsyncFunctionWithConstants(markup, sharedImportKeys)).toBe(markup);
  });
});

describe('getIndexHtml()', () => {
  const mockedMarkup = 'Some markup';
  const mockedMarkupWithLoadFunction = 'Some markup with load function';
  const sharedImportKeys: SharedImportKey[] = [];
  const mockedGlobalStyles = 'Some global styles';

  it('should call extendMarkupWithLoadFunction() and replaceSharedAsyncFunctionWithConstants() with correct parameters', () => {
    const getExtendMarkupWithLoadFunctionSpy = jest
      .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
      .mockReturnValue(mockedMarkupWithLoadFunction);
    const replaceSharedAsyncFunctionWithConstantsSpy = jest
      .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
      .mockReturnValue(mockedMarkup);

    getIndexHtml(mockedMarkup, 'ltr', '', [], sharedImportKeys, '');

    expect(getExtendMarkupWithLoadFunctionSpy).toHaveBeenCalledWith(mockedMarkup);
    expect(replaceSharedAsyncFunctionWithConstantsSpy).toHaveBeenCalledWith(
      mockedMarkupWithLoadFunction,
      sharedImportKeys
    );
  });

  describe('development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);
    });

    it('should return correct markup without externalDependencies', () => {
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
        .mockReturnValue(mockedMarkupWithLoadFunction);
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
        .mockReturnValue(mockedMarkup);

      expect(getIndexHtml(mockedMarkup, 'ltr', mockedGlobalStyles, [], sharedImportKeys, '')).toMatchSnapshot();
    });

    it('should return correct markup with rtl mode', () => {
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
        .mockReturnValue(mockedMarkupWithLoadFunction);
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
        .mockReturnValue(mockedMarkup);

      expect(getIndexHtml(mockedMarkup, 'rtl', mockedGlobalStyles, [], sharedImportKeys, '')).toMatchSnapshot();
    });

    it('should return correct markup with externalDependencies', () => {
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
        .mockReturnValue(mockedMarkupWithLoadFunction);
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
        .mockReturnValue(mockedMarkup);

      expect(getIndexHtml(mockedMarkup, 'ltr', mockedGlobalStyles, ['imask'], sharedImportKeys, '')).toMatchSnapshot();
    });

    it('should return correct markup when chosen pds version for bug reporting', () => {
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
        .mockReturnValue(mockedMarkupWithLoadFunction);
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
        .mockReturnValue(mockedMarkup);

      expect(getIndexHtml(mockedMarkup, 'ltr', mockedGlobalStyles, [], sharedImportKeys, '1.2.3')).toMatchSnapshot();
    });
  });

  describe('stable storefront release (e.g. /v2/…, /v3/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    });

    it('should return correct markup without externalDependencies', () => {
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
        .mockReturnValue(mockedMarkupWithLoadFunction);
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
        .mockReturnValue(mockedMarkup);

      expect(getIndexHtml(mockedMarkup, 'ltr', mockedGlobalStyles, [], sharedImportKeys, '')).toMatchSnapshot();
    });

    it('should return correct markup with externalDependencies', () => {
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
        .mockReturnValue(mockedMarkupWithLoadFunction);
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
        .mockReturnValue(mockedMarkup);

      expect(getIndexHtml(mockedMarkup, 'ltr', mockedGlobalStyles, ['imask'], sharedImportKeys, '')).toMatchSnapshot();
    });

    it('should return correct markup when chosen pds version for bug reporting', () => {
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
        .mockReturnValue(mockedMarkupWithLoadFunction);
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
        .mockReturnValue(mockedMarkup);

      expect(getIndexHtml(mockedMarkup, 'ltr', mockedGlobalStyles, [], sharedImportKeys, '1.2.3')).toMatchSnapshot();
    });
  });
});

describe('getIndexJs()', () => {
  describe('stable storefront release (e.g. /v2/…, /v3/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    });

    it('should return correct no script when pds version is chosen for bug reporting', () => {
      expect(getIndexJs('1.2.3')).toMatchSnapshot();
    });

    it('should return correct no script when pds version is not chosen for bug reporting', () => {
      expect(getIndexJs('')).toMatchSnapshot();
    });

    it('should return correct script with additionalImports', () => {
      expect(getIndexJs('', ['ag-grid-community'])).toMatchSnapshot();
    });
  });

  describe('development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);
    });

    it('should return correct script', () => {
      expect(getIndexJs('')).toMatchSnapshot();
    });

    it('should return correct script with additionalImports', () => {
      expect(getIndexJs('', ['ag-grid-community'])).toMatchSnapshot();
    });

    it('should return correct no script when pds version is chosen for bug reporting', () => {
      expect(getIndexJs('1.2.3')).toMatchSnapshot();
    });
  });
});

describe('getDependencies()', () => {
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
      ...{ '@porsche-design-system/components-js': '0.0.0' },
      ...mockedDependency,
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for stable storefront release (e.g. /v2/…, /v3/…) and chosen pds version for bug reporting', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '1.2.3')).toEqual({
      ...{ '@porsche-design-system/components-js': '1.2.3' },
      ...mockedDependency,
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '')).toEqual({
      ...mockedDependency,
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for development mode or non stable storefront release (e.g. /issue/…, /release/…) and chosen pds version for bug reporting', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '1.2.3')).toEqual({
      ...{ '@porsche-design-system/components-js': '1.2.3' },
      ...mockedDependency,
    });
  });
});

describe('getVanillaJsProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    porscheDesignSystemBundle: {
      '@porsche-design-system/components-js/package.json': 'some package.json',
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
    const { markup, dir, globalStyles, externalDependencies, sharedImportKeys } = stackBlitzFrameworkOpts;

    const getIndexHtmlSpy = jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getIndexHtml');
    const getDependenciesSpy = jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getDependencies');
    const getIndexJsSpy = jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getIndexJs');

    getVanillaJsProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(getIndexHtmlSpy).toHaveBeenCalledWith(markup, dir, globalStyles, externalDependencies, sharedImportKeys, '');
    expect(getDependenciesSpy).toHaveBeenCalledWith(externalDependencies, '');
    expect(getIndexJsSpy).toHaveBeenCalled();
  });

  it('should return correct StackBlitzProjectAndOpenOptions', () => {
    const mockedIndexHtml = 'Some mocked index markup';
    const mockedIndexJs = 'Some mocked index script';
    const mockedDependencies = { mockedDependency: '0.0.0' };

    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getIndexHtml').mockReturnValue(mockedIndexHtml);
    jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getIndexJs').mockReturnValue(mockedIndexJs);
    jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getDependencies').mockReturnValue(mockedDependencies);

    const result = getVanillaJsProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result).toEqual({
      files: {
        ...stackBlitzFrameworkOpts.porscheDesignSystemBundle,
        'index.html': mockedIndexHtml,
        'index.js': mockedIndexJs,
      },
      template: 'javascript',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      dependencies: mockedDependencies,
      openFile: 'index.html',
    });
  });
});
