import {
  extendMarkupWithAppComponent,
  getDependencies,
  getReactProjectAndOpenOptions,
  replaceSharedImportsWithConstants,
  dependencyMap,
  getIndexTsx,
  getTsconfigJson,
  getAppTsx,
} from '../../src/utils/stackblitz/getReactProjectAndOpenOptions';
import type { SharedImportKey, StackBlitzFrameworkOpts, ExternalDependency } from '../../src/utils';
import * as getReactProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getReactProjectAndOpenOptions';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';

jest.mock('../../../components-react/package.json', () => ({
  dependencies: {
    'react-imask': '0.0.0',
    '@porsche-design-system/components-react': '0.0.0',
    react: '0.0.0',
    'react-dom': '0.0.0',
  },
  devDependencies: {
    '@types/react': '0.0.0',
    '@types/react-dom': '0.0.0',
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
    const mockedReplaceValue = 'Some mocked markup';

    const spy = jest.spyOn(stackBlitzHelperUtils, 'removeSharedImport');
    jest.spyOn(String.prototype, 'replace').mockReturnValue(mockedReplaceValue);

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toBeCalledWith(mockedReplaceValue);
  });

  it('should call replace() with correct parameters', () => {
    const mockedGetSharedImportConstants = 'Some mocked markup';

    jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants').mockReturnValue(mockedGetSharedImportConstants);
    const spy = jest.spyOn(String.prototype, 'replace');

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toBeCalledWith(
      /(export const )[a-zA-Z]+( = \(\): JSX.Element => {)/,
      `${mockedGetSharedImportConstants}$1App$2`
    );
  });

  it('should return result of removeSharedImport()', () => {
    const mockedRemoveSharedImport = 'Markup with removed import';
    jest.spyOn(stackBlitzHelperUtils, 'removeSharedImport').mockReturnValue(mockedRemoveSharedImport);

    expect(replaceSharedImportsWithConstants(markup, sharedImportKeys)).toBe(mockedRemoveSharedImport);
  });
});

describe('extendMarkupWithAppComponent()', () => {
  const markup = 'Some Markup';

  it('should call convertMarkup() with correct parameters', () => {
    const spy = jest.spyOn(formattingUtils, 'convertMarkup');

    extendMarkupWithAppComponent(markup);

    expect(spy).toBeCalledWith(markup, 'react');
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

describe('getAppTsx()', () => {
  it('should call convertImportPaths() + replaceSharedImportsWithConstants()', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'replaceSharedImportsWithConstants'
    );
    const extendMarkupWithAppComponentSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'extendMarkupWithAppComponent'
    );

    getAppTsx('some markup', true, []);

    expect(convertImportPathsSpy).toBeCalledTimes(1);
    expect(replaceSharedImportsWithConstantsSpy).toBeCalledWith('some markup', []);
    expect(extendMarkupWithAppComponentSpy).not.toBeCalled();
  });

  it('should call convertImportPaths() + extendMarkupWithAppComponent()', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'replaceSharedImportsWithConstants'
    );
    const extendMarkupWithAppComponentSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'extendMarkupWithAppComponent'
    );

    getAppTsx('some markup', false, []);

    expect(convertImportPathsSpy).toBeCalledTimes(1);
    expect(replaceSharedImportsWithConstantsSpy).not.toBeCalled();
    expect(extendMarkupWithAppComponentSpy).toBeCalledWith('some markup');
  });
});

describe('getIndexTsx()', () => {
  it('should return correct values', () => {
    const spy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');

    expect(getIndexTsx()).toMatchSnapshot();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('getTsconfigJson()', () => {
  it('should return correct values', () => {
    expect(getTsconfigJson()).toMatchSnapshot();
  });
});

describe('getDependencies()', () => {
  const expectedDefaultDependencies = {
    react: '0.0.0',
    'react-dom': '0.0.0',
    '@types/react': '0.0.0',
    '@types/react-dom': '0.0.0',
  };

  const expectedStableReleaseDependencies = {
    ...expectedDefaultDependencies,
    '@porsche-design-system/components-react': '0.0.0',
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

describe('getReactProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    porscheDesignSystemBundle: {
      '@porsche-design-system/components-js/package.json': 'some package.json',
      '@porsche-design-system/components-react/package.json': 'some package.json',
    },
    markup: 'Some markup',
    description: 'Some description',
    title: 'Some title',
    globalStyles: 'body {}',
    externalDependencies: [],
    sharedImportKeys: [],
  };

  it('should call several functions with correct parameters', () => {
    const isStableStorefrontReleaseSpy = jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease');
    const getAppTsxSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getAppTsx');
    const getIndexTsxSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getIndexTsx');
    const getTsconfigJsonSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getTsconfigJson');
    const getDependenciesSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getDependencies');

    getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(isStableStorefrontReleaseSpy).toBeCalled();
    expect(getAppTsxSpy).toBeCalledWith(
      stackBlitzFrameworkOpts.markup,
      false,
      stackBlitzFrameworkOpts.sharedImportKeys
    );
    expect(getIndexTsxSpy).toBeCalled();
    expect(getTsconfigJsonSpy).toBeCalled();
    expect(getDependenciesSpy).toBeCalledWith(stackBlitzFrameworkOpts.externalDependencies);
  });

  it('should return correct StackBlitzProjectAndOpenOptions', () => {
    const mockedDependencies = { mockedDependency: '0.0.0' };
    const mockedAppTsx = 'Some mocked app markup';
    const mockedIndexTsx = 'Some mocked index markup';
    const mockedTsConfigJson = 'Some mocked ts config';

    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getAppTsx').mockReturnValue(mockedAppTsx);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getIndexTsx').mockReturnValue(mockedIndexTsx);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getTsconfigJson').mockReturnValue(mockedTsConfigJson);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getDependencies').mockReturnValue(mockedDependencies);

    const result = getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result).toEqual({
      files: {
        ...stackBlitzFrameworkOpts.porscheDesignSystemBundle,
        'App.tsx': mockedAppTsx,
        'index.html': '<div id="root"></div>',
        'index.tsx': mockedIndexTsx,
        'tsconfig.json': mockedTsConfigJson,
        'style.css': stackBlitzFrameworkOpts.globalStyles,
      },
      template: 'create-react-app',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      dependencies: mockedDependencies,
      openFile: 'App.tsx',
    });
  });
});
