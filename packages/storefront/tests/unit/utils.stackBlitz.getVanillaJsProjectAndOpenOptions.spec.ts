import {
  dependencyMap,
  getExtendedMarkupWithLoadFunction,
  getIndexHtmlMarkup,
  getVanillaJsDependencies,
  getVanillaJsProjectAndOpenOptions,
  replaceSharedAsyncFunctionWithConstants,
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
}));

describe('getIndexHtmlMarkup()', () => {
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

    getIndexHtmlMarkup(mockedMarkup, '', [], sharedImportKeys);

    expect(getExtendMarkupWithLoadFunctionSpy).toBeCalledWith(mockedMarkup);
    expect(replaceSharedAsyncFunctionWithConstantsSpy).toBeCalledWith(mockedMarkupWithLoadFunction, sharedImportKeys);
  });

  it('should return correct markup without externalDependencies', () => {
    jest
      .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
      .mockReturnValue(mockedMarkupWithLoadFunction);
    jest
      .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
      .mockReturnValue(mockedMarkup);

    expect(getIndexHtmlMarkup(mockedMarkup, mockedGlobalStyles, [], sharedImportKeys)).toMatchSnapshot();
  });

  it('should return correct markup with externalDependencies', () => {
    jest
      .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getExtendedMarkupWithLoadFunction')
      .mockReturnValue(mockedMarkupWithLoadFunction);
    jest
      .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'replaceSharedAsyncFunctionWithConstants')
      .mockReturnValue(mockedMarkup);

    expect(getIndexHtmlMarkup(mockedMarkup, mockedGlobalStyles, ['imask'], sharedImportKeys)).toMatchSnapshot();
  });
});

describe('getExtendedMarkupWithLoadFunction()', () => {
  it('should return script with load() call if markup contains script', () => {
    const markup = '<p-button>SomeButton</p-button>\n<script>console.log()</script>';

    expect(getExtendedMarkupWithLoadFunction(markup)).toMatchSnapshot();
  });
  it('should return markup with script including load() call', () => {
    const markup = '<p-button>Some snippet</p-button>';

    expect(getExtendedMarkupWithLoadFunction(markup)).toMatchSnapshot();
  });
});

describe('replaceSharedAsyncFunctionWithConstants()', () => {
  const markup = 'Some markup';
  const sharedImportKeys: SharedImportKey[] = [];

  it('should call getSharedImportConstants() with correct parameters', () => {
    const sharedImportKeys: SharedImportKey[] = [];
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants');

    replaceSharedAsyncFunctionWithConstants(markup, sharedImportKeys);

    expect(spy).toBeCalledWith(sharedImportKeys);
  });

  it('should call replace() with correct parameters', () => {
    const sharedImportKeys: SharedImportKey[] = [];
    const getSharedImportConstantsMock = 'Some mock value';
    const replaceMockValue = 'Some mock value';

    const spy = jest.spyOn(String.prototype, 'replace').mockReturnValue(replaceMockValue);
    jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants').mockReturnValue(getSharedImportConstantsMock);

    expect(replaceSharedAsyncFunctionWithConstants(markup, sharedImportKeys)).toBe(replaceMockValue);
    expect(spy).toBeCalledWith(/const { .* } = await [A-z]+\(\);/, getSharedImportConstantsMock);
  });

  it('should return unmodified markup parameter if regex does not match', () => {
    expect(replaceSharedAsyncFunctionWithConstants(markup, sharedImportKeys)).toBe(markup);
  });
});

describe('getVanillaJsDependencies()', () => {
  it('should call getExternalDependencies() with correct parameters', () => {
    const externalDependencies: ExternalDependency[] = ['imask'];
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies');

    getVanillaJsDependencies(externalDependencies);

    expect(spy).toBeCalledWith(externalDependencies, dependencyMap);
  });

  it('should return correct StackblitzProjectDependencies for [] as externalDependencies and process.env.NODE_ENV = "test"', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(getVanillaJsDependencies([])).toEqual({
      '@porsche-design-system/components-js': '0.0.0',
    });
  });

  it('should return correct StackblitzProjectDependencies for [] as externalDependencies and process.env.NODE_ENV = "development"', () => {
    const initialNodeEnvValue = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    expect(getVanillaJsDependencies([])).toEqual({
      '@porsche-design-system/components-js': 'latest',
    });

    process.env.NODE_ENV = initialNodeEnvValue;
  });

  it('should return correct StackblitzProjectDependencies with externalDependency', () => {
    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getVanillaJsDependencies(['imask'])).toEqual({
      '@porsche-design-system/components-js': '0.0.0',
      ...mockedDependency,
    });
  });
});

describe('getVanillaJsProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    markup: 'Some markup',
    description: 'Some description',
    title: 'Some title',
    globalStyles: 'body {}',
    externalDependencies: [],
    sharedImportKeys: [],
  };

  it('should call getIndexHtmlMarkup() and getVanillaJsDependencies() with correct parameters', () => {
    const { markup, globalStyles, externalDependencies, sharedImportKeys } = stackBlitzFrameworkOpts;

    const getIndexHtmlMarkupSpy = jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getIndexHtmlMarkup');
    const getVanillaJsDependenciesSpy = jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getVanillaJsDependencies');

    getVanillaJsProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(getIndexHtmlMarkupSpy).toBeCalledWith(markup, globalStyles, externalDependencies, sharedImportKeys);
    expect(getVanillaJsDependenciesSpy).toBeCalledWith(externalDependencies);
  });

  it('should return correct StackBlitzProjectAndOpenOptions', () => {
    const mockedMarkup = 'Some value';
    const mockedDependencies = { mockedDependency: '0.0.0' };

    jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getIndexHtmlMarkup').mockReturnValue(mockedMarkup);
    jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getVanillaJsDependencies').mockReturnValue(mockedDependencies);

    const result = getVanillaJsProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result).toEqual({
      files: {
        'index.html': mockedMarkup,
        'index.js': '',
      },
      template: 'javascript',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      dependencies: mockedDependencies,
      openFile: 'index.html',
    });
  });
});
