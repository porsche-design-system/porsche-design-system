import {
  extendMarkupWithAppComponent,
  getReactDependencies,
  getReactProjectAndOpenOptions,
  indexTsMarkup,
  replaceSharedImportsWithConstants,
  dependencyMap,
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

describe('getReactDependencies()', () => {
  it('should call getExternalDependencies() with correct parameters', () => {
    const externalDependencies: ExternalDependency[] = ['imask'];
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies');

    getReactDependencies(externalDependencies);

    expect(spy).toBeCalledWith(externalDependencies, dependencyMap);
  });

  it('should return correct StackblitzProjectDependencies for [] as externalDependencies', () => {
    expect(getReactDependencies([])).toEqual({
      '@porsche-design-system/components-react': '0.0.0',
      react: '0.0.0',
      'react-dom': '0.0.0',
      '@types/react': '0.0.0',
      '@types/react-dom': '0.0.0',
    });
  });

  it('should return correct StackblitzProjectDependencies with externalDependency', () => {
    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getReactDependencies(['imask'])).toEqual({
      '@porsche-design-system/components-react': '0.0.0',
      react: '0.0.0',
      'react-dom': '0.0.0',
      '@types/react': '0.0.0',
      '@types/react-dom': '0.0.0',
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

  it('should call getReactDependencies() with correct parameters', () => {
    const spy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getReactDependencies');

    getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(spy).toBeCalledWith(stackBlitzFrameworkOpts.externalDependencies);
  });

  it('should return correct StackBlitzProjectAndOpenOptions', () => {
    const mockedDependencies = { mockedDependency: '0.0.0' };
    const mockedMarkup = 'Some mocked markup';
    const mockedJSONString = 'Some String';

    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'extendMarkupWithAppComponent').mockReturnValue(mockedMarkup);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getReactDependencies').mockReturnValue(mockedDependencies);
    jest.spyOn(JSON, 'stringify').mockReturnValue(mockedJSONString);

    expect(getReactProjectAndOpenOptions(stackBlitzFrameworkOpts)).toEqual({
      files: {
        'App.tsx': mockedMarkup,
        'index.html': '<div id="root"></div>',
        'index.tsx': indexTsMarkup,
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
});
