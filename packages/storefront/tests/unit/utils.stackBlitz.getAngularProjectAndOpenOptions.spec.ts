import {
  extendMarkupWithAppComponent,
  getAngularDependencies,
  getAngularProjectAndOpenOptions,
  getAppModuleTsMarkup,
  getIndexHtmlMarkup,
  mainTsMarkup,
  dependencyMap,
  replaceSharedImportsWithConstants,
} from '../../src/utils/stackblitz/getAngularProjectAndOpenOptions';
import type { ExternalDependency, SharedImportKey, StackBlitzFrameworkOpts } from '../../src/utils';

import * as getAngularProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getAngularProjectAndOpenOptions';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';

jest.mock('../../../components-angular/package.json', () => ({
  dependencies: {
    '@angular/animations': '0.0.0',
    '@angular/common': '0.0.0',
    '@angular/compiler': '0.0.0',
    '@angular/core': '0.0.0',
    '@angular/forms': '0.0.0',
    '@angular/platform-browser': '0.0.0',
    '@angular/platform-browser-dynamic': '0.0.0',
    '@angular/router': '0.0.0',
    rxjs: '0.0.0',
    tslib: '0.0.0',
    'zone.js': '0.0.0',
    imask: '0.0.0',
    'angular-imask': '0.0.0',
  },
}));

describe('replaceSharedImportsWithConstants()', () => {
  const markup = 'Some markup';
  const sharedImportKeys: SharedImportKey[] = [];

  it('should call getSharedImportConstants() with correct parameters', () => {
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants');

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toBeCalledWith(sharedImportKeys);
  });

  it('should call removeSharedImport() with correct parameters', () => {
    const mockedReplaceValue = 'Some mocked value';
    const spy = jest.spyOn(stackBlitzHelperUtils, 'removeSharedImport');
    jest.spyOn(String.prototype, 'replace').mockReturnValue(mockedReplaceValue);

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toBeCalledWith(mockedReplaceValue);
  });

  it('should call replace() with correct parameters', () => {
    const mockedsetSharedImportConstants = 'Some mocked constants';
    jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants').mockReturnValue(mockedsetSharedImportConstants);
    const spy = jest.spyOn(String.prototype, 'replace');

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toHaveBeenNthCalledWith(
      1,
      /(@Component\({\n\s{2}selector: ')[a-z-]+/,
      `${mockedsetSharedImportConstants}$1porsche-design-system-app`
    );
    expect(spy).toHaveBeenNthCalledWith(2, /(export class )[A-z]+( {)/, '$1AppComponent$2');
  });

  it('should return correct string without sharedImportKeys', () => {
    const mockedRemoveSharedImport = 'Markup with removed import';
    jest.spyOn(stackBlitzHelperUtils, 'removeSharedImport').mockReturnValue(mockedRemoveSharedImport);

    expect(replaceSharedImportsWithConstants(markup, sharedImportKeys)).toBe(mockedRemoveSharedImport);
  });

  it('should return correct string with sharedImportKeys', () => {
    const mockedRemoveSharedImport = 'Markup with removed import';
    jest.spyOn(stackBlitzHelperUtils, 'removeSharedImport').mockReturnValue(mockedRemoveSharedImport);

    expect(replaceSharedImportsWithConstants(markup, ['headBasic'])).toBe(
      `// @ts-nocheck
${mockedRemoveSharedImport}`
    );
  });
});

describe('extendMarkupWithAppComponent()', () => {
  it('should call convertMarkup() with correct parameters', () => {
    const markup = 'Some markup';
    const spy = jest.spyOn(formattingUtils, 'convertMarkup');

    extendMarkupWithAppComponent(markup);

    expect(spy).toBeCalledWith(markup, 'angular');
  });

  it('should call replace() with correct parameters', () => {
    const spy = jest.spyOn(String.prototype, 'replace');

    extendMarkupWithAppComponent('Some Markup');

    expect(spy).toBeCalledWith(/(\n)/g, '$1    ');
  });

  it('should return correct markup', () => {
    const mockedConvertMarkup = 'Some mocked markup';

    jest.spyOn(formattingUtils, 'convertMarkup').mockReturnValue(mockedConvertMarkup);
    expect(extendMarkupWithAppComponent('Some Markup')).toMatchSnapshot();
  });
});

describe('getAppModuleTsMarkup()', () => {
  it('should return correct markup for [] as externalDependencies', () => {
    expect(getAppModuleTsMarkup([])).toMatchSnapshot();
  });

  it('should return correct markup with externalDependencies', () => {
    expect(getAppModuleTsMarkup(['imask'])).toMatchSnapshot();
  });
});

describe('getAngularDependencies()', () => {
  const expectedDefaultDependencies = {
    '@angular/animations': '0.0.0',
    '@angular/common': '0.0.0',
    '@angular/compiler': '0.0.0',
    '@angular/core': '0.0.0',
    '@angular/forms': '0.0.0',
    '@angular/platform-browser': '0.0.0',
    '@angular/platform-browser-dynamic': '0.0.0',
    '@angular/router': '0.0.0',
    rxjs: '0.0.0',
    tslib: '0.0.0',
    'zone.js': '0.0.0',
    '@porsche-design-system/components-angular': 'latest',
  };

  it('should call getExternalDependencies() with correct parameters', () => {
    const externalDependencies: ExternalDependency[] = ['imask'];
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies');

    getAngularDependencies(externalDependencies);

    expect(spy).toBeCalledWith(externalDependencies, dependencyMap);
  });

  it('should return correct StackblitzProjectDependencies for [] as externalDependencies', () => {
    expect(getAngularDependencies([])).toEqual(expectedDefaultDependencies);
  });

  it('should return correctStackblitzProjectDependencies with externalDependency', () => {
    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getAngularDependencies(['imask'])).toEqual({ ...expectedDefaultDependencies, ...mockedDependency });
  });
});

describe('getAngularProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    markup: 'Some markup',
    description: 'Some description',
    title: 'Some title',
    globalStyles: 'body {}',
    externalDependencies: [],
    sharedImportKeys: [],
  };

  it('should call getIndexHtmlMarkup() with correct parameters', () => {
    const spy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getIndexHtmlMarkup');

    getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(spy).toBeCalledWith(stackBlitzFrameworkOpts.globalStyles);
  });

  it('should call replaceSharedImportsWithConstants() with correct parameters if isExampleMarkup = true', () => {
    const matchSpy = jest.spyOn(String.prototype, 'match').mockReturnValue(['Some example markup']);
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(
      getAngularProjectAndOpenOptionsUtils,
      'replaceSharedImportsWithConstants'
    );

    getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(matchSpy).toBeCalledWith(/(export class )[A-z]+( {)/);
    expect(replaceSharedImportsWithConstantsSpy).toBeCalledWith(
      stackBlitzFrameworkOpts.markup,
      stackBlitzFrameworkOpts.sharedImportKeys
    );
  });

  it('should call extendMarkupWithAppComponent() with correct parameters if isExampleMarkup = false', () => {
    jest.spyOn(String.prototype, 'match').mockReturnValue(null);
    const spy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent');

    getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(spy).toBeCalledWith(stackBlitzFrameworkOpts.markup);
  });

  it('should call getAppModuleTsMarkup() with correct parameters', () => {
    const spy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAppModuleTsMarkup');

    getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(spy).toBeCalledWith(stackBlitzFrameworkOpts.externalDependencies);
  });

  it('should call getAngularDependencies() with correct parameters', () => {
    const spy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAngularDependencies');

    getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(spy).toBeCalledWith(stackBlitzFrameworkOpts.externalDependencies);
  });

  it('should return correct StackBlitzProjectAndOpenOptions', () => {
    const mockedDependencies = { mockedDependency: '0.0.0' };
    const mockedGetIndexHtmlMarkup = 'Some mocked markup';
    const mockedExtendMarkupWithAppComponent = 'Some mocked markup';
    const mockedGetAppModuleTsMarkup = 'Some mocked markup';

    jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getIndexHtmlMarkup').mockReturnValue(mockedGetIndexHtmlMarkup);
    jest
      .spyOn(getAngularProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent')
      .mockReturnValue(mockedExtendMarkupWithAppComponent);
    jest
      .spyOn(getAngularProjectAndOpenOptionsUtils, 'getAppModuleTsMarkup')
      .mockReturnValue(mockedGetAppModuleTsMarkup);
    jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAngularDependencies').mockReturnValue(mockedDependencies);

    expect(getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts)).toEqual({
      files: {
        'src/index.html': mockedGetIndexHtmlMarkup,
        'src/main.ts': mainTsMarkup,
        'src/app/app.component.ts': mockedExtendMarkupWithAppComponent,
        'src/app/app.module.ts': mockedGetAppModuleTsMarkup,
      },
      template: 'angular-cli',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      dependencies: mockedDependencies,
    });
  });
});
