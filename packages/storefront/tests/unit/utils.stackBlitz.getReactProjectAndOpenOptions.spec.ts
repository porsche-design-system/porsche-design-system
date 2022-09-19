import {
  extendMarkupWithAppComponent,
  getDependencies,
  getReactProjectAndOpenOptions,
  replaceSharedImportsWithConstants,
  dependencyMap, getIndexTsx, getTsconfigJson, getAppTsx,
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
      /(export const )[A-z]+( = \(\): JSX.Element => {)/,
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
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'replaceSharedImportsWithConstants');
    const extendMarkupWithAppComponentSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent');

    getAppTsx('some markup', true, []);

    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
    expect(replaceSharedImportsWithConstantsSpy).toHaveBeenCalledWith('some markup', []);
    expect(extendMarkupWithAppComponentSpy).not.toHaveBeenCalled();
  });

  it('should call convertImportPaths() + extendMarkupWithAppComponent()', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'replaceSharedImportsWithConstants');
    const extendMarkupWithAppComponentSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent');

    getAppTsx('some markup', false, []);

    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
    expect(replaceSharedImportsWithConstantsSpy).not.toHaveBeenCalled();
    expect(extendMarkupWithAppComponentSpy).toHaveBeenCalledWith('some markup');
  });
});

describe('getIndexTsx()', () => {
  it('should return correct values', () => {
    const spy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');

    expect(getIndexTsx()).toMatchSnapshot();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('tsconfigJson()', () => {
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
    markup: 'Some markup',
    description: 'Some description',
    title: 'Some title',
    globalStyles: 'body {}',
    externalDependencies: [],
    sharedImportKeys: [],
  };

  it('should call replaceSharedImportsWithConstants() with correct parameters when isExampleMarkup is true', () => {
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'replaceSharedImportsWithConstants'
    );
    const matchSpy = jest.spyOn(String.prototype, 'match').mockReturnValue(['Some example markup']);

    getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(matchSpy).toBeCalledWith(/(export const )[A-z]+( = \(\): JSX.Element => {)/);
    expect(replaceSharedImportsWithConstantsSpy).toBeCalledWith(
      stackBlitzFrameworkOpts.markup,
      stackBlitzFrameworkOpts.sharedImportKeys
    );
  });

  it('should call extendMarkupWithAppComponent() with correct parameters when isExampleMarkup is false', () => {
    const spy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent');
    jest.spyOn(String.prototype, 'match').mockReturnValue(null);

    getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(spy).toBeCalledWith(stackBlitzFrameworkOpts.markup);
  });

  it('should call getDependencies() with correct parameters', () => {
    const spy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getDependencies');

    getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(spy).toBeCalledWith(stackBlitzFrameworkOpts.externalDependencies);
  });

  it('should return correct StackBlitzProjectAndOpenOptions for stable storefront release (e.g. /v2/…, /v3/…)', () => {
    const mockedDependencies = { mockedDependency: '0.0.0' };
    const mockedMarkup = 'Some mocked markup';
    const mockedJSONString = 'Some String';
    const mockedIndexTsx = 'Some markup';

    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent').mockReturnValue(mockedMarkup);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getIndexTsx').mockReturnValue(mockedIndexTsx);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getDependencies').mockReturnValue(mockedDependencies);
    jest.spyOn(JSON, 'stringify').mockReturnValue(mockedJSONString);

    const result = getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result.files['@porsche-design-system/components-js/package.json']).toBeUndefined();
    expect(result.files['@porsche-design-system/components-react/package.json']).toBeUndefined();

    expect(result).toEqual({
      files: {
        'App.tsx': mockedMarkup,
        'index.html': '<div id="root"></div>',
        'index.tsx': mockedIndexTsx,
        'tsconfig.json': mockedJSONString,
        'style.css': stackBlitzFrameworkOpts.globalStyles,
      },
      template: 'create-react-app',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      dependencies: mockedDependencies,
      openFile: 'App.tsx',
    });
  });

  it('should contain porsche design system component bundle for development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const result = getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result.files['@porsche-design-system/components-js/package.json']).toBeDefined();
    // expect(result.files['@porsche-design-system/components-react/package.json']).toBeDefined();
  });
});
