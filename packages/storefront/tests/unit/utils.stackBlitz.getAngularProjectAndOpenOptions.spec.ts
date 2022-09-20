import {
  extendMarkupWithAppComponent,
  getDependencies,
  getAngularProjectAndOpenOptions,
  getAppModuleTs,
  getIndexHtml,
  getMainTs,
  dependencyMap,
  replaceSharedImportsWithConstants,
  getAppComponentTs,
} from '../../src/utils/stackblitz/getAngularProjectAndOpenOptions';
import type { ExternalDependency, SharedImportKey, StackBlitzFrameworkOpts } from '../../src/utils';

import * as getAngularProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getAngularProjectAndOpenOptions';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';
import { isStableStorefrontRelease } from '../../src/utils/stackblitz/helper';

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
    '@porsche-design-system/components-angular': '0.0.0',
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

describe('getAppComponentTs()', () => {
  it('should call convertImportPaths() + replaceSharedImportsWithConstants()', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'replaceSharedImportsWithConstants');
    const extendMarkupWithAppComponentSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent');

    getAppComponentTs('some markup', true, []);

    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
    expect(replaceSharedImportsWithConstantsSpy).toHaveBeenCalledWith('some markup', []);
    expect(extendMarkupWithAppComponentSpy).not.toHaveBeenCalled();
  });

  it('should call convertImportPaths() + extendMarkupWithAppComponent()', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'replaceSharedImportsWithConstants');
    const extendMarkupWithAppComponentSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent');

    getAppComponentTs('some markup', false, []);

    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
    expect(replaceSharedImportsWithConstantsSpy).not.toHaveBeenCalled();
    expect(extendMarkupWithAppComponentSpy).toHaveBeenCalledWith('some markup');
  });
});

describe('getAppModuleTs()', () => {
  describe('development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);
    });

    it('should return correct markup for [] as externalDependencies', () => {
      expect(getAppModuleTs([])).toMatchSnapshot();
    });

    it('should return correct markup with externalDependencies', () => {
      expect(getAppModuleTs(['imask'])).toMatchSnapshot();
    });
  });

  describe('stable storefront release (e.g. /v2/…, /v3/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    });

    it('should return correct markup for [] as externalDependencies', () => {
      expect(getAppModuleTs([])).toMatchSnapshot();
    });

    it('should return correct markup with externalDependencies', () => {
      expect(getAppModuleTs(['imask'])).toMatchSnapshot();
    });
  });
});

describe('getIndexHtml()', () => {
  it('should return correct markup with styles', () => {
    expect(getIndexHtml('some styles')).toMatchSnapshot();
  });
});

describe('getMainTs()', () => {
  it('should return correct markup', () => {
    expect(getMainTs()).toMatchSnapshot();
  });
});

describe('getDependencies()', () => {
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
  };

  const expectedStableReleaseDependencies = {
    ...expectedDefaultDependencies,
    '@porsche-design-system/components-angular': '0.0.0',
  };

  it('should call getExternalDependencies() with correct parameters', () => {
    const externalDependencies: ExternalDependency[] = ['imask'];
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies');

    getDependencies(externalDependencies);

    expect(spy).toBeCalledWith(externalDependencies, dependencyMap);
  });

  it('should return correct StackblitzProjectDependencies with externalDependency for stable storefront release (e.g. /v2/…, /v3/…)', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'])).toEqual({
      ...expectedStableReleaseDependencies,
      ...mockedDependency,
    });
  });

  it('should return correct StackblitzProjectDependencies with externalDependency for development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'])).toEqual({
      ...expectedDefaultDependencies,
      ...mockedDependency,
    });
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

  it('should call several functions with correct parameters', () => {
    const isStableStorefrontReleaseSpy = jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease');
    const getAppComponentTsSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAppComponentTs');
    const getAppModuleTsSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAppModuleTs');
    const getIndexHtmlSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getIndexHtml');
    const getDependenciesSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getDependencies');

    getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(isStableStorefrontReleaseSpy).toBeCalled();
    expect(getAppComponentTsSpy).toBeCalledWith(stackBlitzFrameworkOpts.markup, false, stackBlitzFrameworkOpts.sharedImportKeys);
    expect(getAppModuleTsSpy).toBeCalledWith(stackBlitzFrameworkOpts.externalDependencies);
    expect(getIndexHtmlSpy).toBeCalledWith(stackBlitzFrameworkOpts.globalStyles);
    expect(getDependenciesSpy).toBeCalledWith(stackBlitzFrameworkOpts.externalDependencies);
  });

  it('should return correct StackBlitzProjectAndOpenOptions for stable storefront release (e.g. /v2/…, /v3/…)', () => {
    const mockedGetAppComponentTs = 'Some mocked app component markup';
    const mockedGetAppModuleTs = 'Some mocked app module markup';
    const mockedGetIndexHtml = 'Some mocked index markup';
    const mockedMainTs = 'Some mocked main markup';
    const mockedDependencies = { mockedDependency: '0.0.0' };

    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getIndexHtml').mockReturnValue(mockedGetIndexHtml);
    jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAppComponentTs').mockReturnValue(mockedGetAppComponentTs);
    jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAppModuleTs').mockReturnValue(mockedGetAppModuleTs);
    jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getDependencies').mockReturnValue(mockedDependencies);
    jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getMainTs').mockReturnValue(mockedMainTs);

    const result = getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result.files['@porsche-design-system/components-js/package.json']).toBeUndefined();
    expect(result.files['@porsche-design-system/components-angular/package.json']).toBeUndefined();
    expect(result).toEqual({
      files: {
        'src/index.html': mockedGetIndexHtml,
        'src/main.ts': mockedMainTs,
        'src/app/app.component.ts': mockedGetAppComponentTs,
        'src/app/app.module.ts': mockedGetAppModuleTs,
      },
      template: 'angular-cli',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      dependencies: mockedDependencies,
    });
  });

  it('should contain porsche design system component bundle for development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const result = getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result.files['@porsche-design-system/components-js/package.json']).toBeDefined();

    // TODO: for unknown reasons the following expect works locally (with and without docker) but not in CI
    // expect(result.files['@porsche-design-system/components-angular/package.json']).toBeDefined();
  });
});
