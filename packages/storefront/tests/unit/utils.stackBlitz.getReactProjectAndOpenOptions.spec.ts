import {
  extendMarkupWithAppComponent,
  getDependencies,
  getReactProjectAndOpenOptions,
  replaceSharedImportsWithConstants,
  dependencyMap,
  getIndexTsx,
  getAppTsx,
  applyStackBlitzFixForReact,
  getIndexHtml,
} from '../../src/utils/stackblitz/getReactProjectAndOpenOptions';
import type { SharedImportKey, StackBlitzFrameworkOpts, ExternalDependency } from '../../src/utils';
import * as getReactProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getReactProjectAndOpenOptions';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';
import { initialStyles } from '../../src/lib/partialResults';

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
    'ag-grid-community': '0.0.0',
    'ag-grid-react': '0.0.0',
  },
}));

describe('replaceSharedImportsWithConstants()', () => {
  const markup = 'Some markup';
  const sharedImportKeys: SharedImportKey[] = [];

  it('should call getSharedImportConstants() with correct parameters', () => {
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants');

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toHaveBeenCalledWith(sharedImportKeys);
  });

  it('should call removeSharedImport() with correct parameters', () => {
    const mockedReplaceValue = 'Some mocked markup';

    const spy = jest.spyOn(stackBlitzHelperUtils, 'removeSharedImport');
    jest.spyOn(String.prototype, 'replace').mockReturnValue(mockedReplaceValue);

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toHaveBeenCalledWith(mockedReplaceValue);
  });

  it('should call replace() with correct parameters', () => {
    const mockedGetSharedImportConstants = 'Some mocked markup';

    jest.spyOn(stackBlitzHelperUtils, 'getSharedImportConstants').mockReturnValue(mockedGetSharedImportConstants);
    const spy = jest.spyOn(String.prototype, 'replace');

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toHaveBeenCalledWith(
      /(export const )[a-zA-Z]+( = \(({[^}]+})?\): JSX.Element => {)/,
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

    expect(spy).toHaveBeenCalledWith(markup, 'react');
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

describe('applyStackBlitzFixForReact()', () => {
  it('should match snapshot', () => {
    const result = applyStackBlitzFixForReact('export const SomeApp = (): JSX.Fragment => (<>some jsx elements</>)');
    expect(result).toMatchSnapshot();
  });
});

describe('getAppTsx()', () => {
  it('should call convertImportPaths() and applyStackBlitzFixForReact()', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const applyStackBlitzFixForReactSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'applyStackBlitzFixForReact');

    getAppTsx('some markup', true, [], '');

    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
    expect(applyStackBlitzFixForReactSpy).toHaveBeenCalledTimes(1);
  });

  it('should call convertImportPaths() + replaceSharedImportsWithConstants()', () => {
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'replaceSharedImportsWithConstants'
    );
    const extendMarkupWithAppComponentSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'extendMarkupWithAppComponent'
    );

    getAppTsx('some markup', true, [], '');

    expect(replaceSharedImportsWithConstantsSpy).toHaveBeenCalledWith('some markup', []);
    expect(extendMarkupWithAppComponentSpy).not.toHaveBeenCalled();
  });

  it('should call convertImportPaths() + extendMarkupWithAppComponent()', () => {
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'replaceSharedImportsWithConstants'
    );
    const extendMarkupWithAppComponentSpy = jest.spyOn(
      getReactProjectAndOpenOptionsUtils,
      'extendMarkupWithAppComponent'
    );

    getAppTsx('some markup', false, [], '');

    expect(replaceSharedImportsWithConstantsSpy).not.toHaveBeenCalled();
    expect(extendMarkupWithAppComponentSpy).toHaveBeenCalledWith('some markup');
  });
});

describe('getIndexTsx()', () => {
  it('should return correct values', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const applyStackBlitzFixForReactSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'applyStackBlitzFixForReact');

    expect(getIndexTsx('')).toMatchSnapshot();
    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
    expect(applyStackBlitzFixForReactSpy).toHaveBeenCalledTimes(1);
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
      ...{
        ...expectedDefaultDependencies,
        '@porsche-design-system/components-react': '1.2.3',
      },
      ...mockedDependency,
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '')).toEqual({
      ...expectedDefaultDependencies,
      ...mockedDependency,
    });
  });

  it('should return correct StackBlitzProjectDependencies with externalDependency for development mode or non stable storefront release (e.g. /issue/…, /release/…) and chosen pds version for bug reporting', () => {
    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);

    const mockedDependency = { mockedImask: '0.0.0' };
    jest.spyOn(stackBlitzHelperUtils, 'getExternalDependencies').mockReturnValue(mockedDependency);

    expect(getDependencies(['imask'], '1.2.3')).toEqual({
      ...{
        ...expectedDefaultDependencies,
        '@porsche-design-system/components-react': '1.2.3',
      },
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
    dir: 'ltr',
    description: 'Some description',
    title: 'Some title',
    globalStyles: 'body {}',
    externalDependencies: [],
    sharedImportKeys: [],
    pdsVersion: '',
  };

  it('should call several functions with correct parameters', () => {
    const isStableStorefrontReleaseSpy = jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease');
    const getAppTsxSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getAppTsx');
    const getIndexTsxSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getIndexTsx');
    const getDependenciesSpy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getDependencies');

    getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(isStableStorefrontReleaseSpy).toHaveBeenCalled();
    expect(getAppTsxSpy).toHaveBeenCalledWith(
      stackBlitzFrameworkOpts.markup,
      false,
      stackBlitzFrameworkOpts.sharedImportKeys,
      ''
    );
    expect(getIndexTsxSpy).toHaveBeenCalledWith('');
    expect(getDependenciesSpy).toHaveBeenCalledWith(stackBlitzFrameworkOpts.externalDependencies, '');
  });

  it('should return correct StackBlitzProjectAndOpenOptions', () => {
    const mockedDependencies = { mockedDependency: '0.0.0' };
    const mockedAppTsx = 'Some mocked app markup';
    const mockedIndexTsx = 'Some mocked index markup';

    jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getAppTsx').mockReturnValue(mockedAppTsx);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getIndexTsx').mockReturnValue(mockedIndexTsx);
    jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getDependencies').mockReturnValue(mockedDependencies);

    const result = getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(result).toEqual({
      files: {
        ...stackBlitzFrameworkOpts.porscheDesignSystemBundle,
        'App.tsx': mockedAppTsx,
        'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - React</title>

    <!-- prettier-ignore -->
    ${initialStyles}

    <style>
      html, body { margin: 0; padding: 0; }
      ${stackBlitzFrameworkOpts.globalStyles}
    </style>
  </head>
  <body dir="ltr">
    <div id="root"></div>
  </body>
</html>`,
        'index.tsx': mockedIndexTsx,
        'style.css': '',
      },
      template: 'create-react-app',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      dependencies: mockedDependencies,
      openFile: 'App.tsx',
    });
  });
});
