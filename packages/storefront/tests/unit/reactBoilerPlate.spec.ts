import {
  getAppDefaultMarkup,
  getAppFrameworkMarkup,
  getAppTsxMarkup,
  getCleanedReactMarkup,
  getReactDependencies,
  getIndexTsxMarkup,
  getReactProjectAndOpenOptions,
  getTsconfigMarkup,
} from '../../src/utils/stackblitz/reactBoilerplate';
import type { StackBlitzFrameworkOpts } from '../../src/utils';

import * as reactBoilerplateUtils from '../../src/utils/stackblitz/reactBoilerplate';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';

describe('getCleanedReactMarkup()', () => {
  it('should replace function name with "App"', () => {
    const expected = 'export const App = (): JSX.Element => {';
    expect(getCleanedReactMarkup('export const TableExampleAdvanced = (): JSX.Element => {')).toBe(expected);
    expect(getCleanedReactMarkup('export const AccordionExample = (): JSX.Element => {')).toBe(expected);
  });
});

describe('getAppFrameworkMarkup()', () => {
  it('should call getCleanedMarkup() with correct parameters', () => {
    const markup = 'Some Markup';
    const spy = jest.spyOn(reactBoilerplateUtils, 'getCleanedReactMarkup');

    getAppFrameworkMarkup(markup, false);
    expect(spy).toBeCalledWith(markup);
  });

  it('should return cleanedMarkup when isTable = false', () => {
    const markup = 'Some Markup';
    const cleanedMarkup = `Cleaned value`;
    jest.spyOn(reactBoilerplateUtils, 'getCleanedReactMarkup').mockReturnValue(cleanedMarkup);

    expect(getAppFrameworkMarkup(markup, false)).toBe(cleanedMarkup);
  });

  it('should call getCleanedMarkup() and replaceSharedTableImports() with correct parameters when isTable = true', () => {
    const markup = 'Some Markup';
    const cleanedMarkup = `Cleaned value`;

    jest.spyOn(reactBoilerplateUtils, 'getCleanedReactMarkup').mockReturnValue(cleanedMarkup);
    const replaceSharedTableImportsSpy = jest
      .spyOn(stackBlitzHelperUtils, 'inlineSharedImports')
      .mockImplementationOnce(() => cleanedMarkup);

    expect(getAppFrameworkMarkup(markup, true)).toBe(cleanedMarkup);
    expect(replaceSharedTableImportsSpy).toBeCalledWith(cleanedMarkup);
  });
});

describe('getDefaultMarkup()', () => {
  it('should callConvertMarkup() with correct parameters', () => {
    const spy = jest.spyOn(formattingUtils, 'convertMarkup');
    const markup = 'Some markup';

    getAppDefaultMarkup(markup, ['p-text']);

    expect(spy).toBeCalledWith(markup, 'react');
  });

  it('should return correct default markup', () => {
    expect(
      getAppDefaultMarkup('<p-text>Some Text</p-text><p-accordion>Some value</p-accordion>', ['p-text', 'p-accordion'])
    ).toMatchSnapshot();
  });
});

describe('getAppTsxMarkup()', () => {
  it('should call getAppFrameworkMarkup() with correct parameters when hasFrameworkMarkup is true', () => {
    const spy = jest.spyOn(reactBoilerplateUtils, 'getAppFrameworkMarkup');
    const markup = 'Some markup';
    getAppTsxMarkup(markup, true, false, ['p-text']);

    expect(spy).toBeCalledWith(markup, false);
  });

  it('should call getAppDefaultMarkup() with correct parameters when hasFrameworkMarkup is false', () => {
    const spy = jest.spyOn(reactBoilerplateUtils, 'getAppDefaultMarkup');
    const markup = 'Some Markup';
    const pdsComponents = ['p-text'];
    getAppTsxMarkup(markup, false, false, pdsComponents);

    expect(spy).toBeCalledWith(markup, pdsComponents);
  });
});

describe('getIndexTsMarkup()', () => {
  it('should return correct markup', () => {
    expect(getIndexTsxMarkup()).toMatchSnapshot();
  });
});

describe('getReactDependencies()', () => {
  it('should return correct dependencies object without additionalDependencies', () => {
    expect(getReactDependencies()).toMatchSnapshot();
  });

  it('should return correct dependencies object with additionalDependency "IMask"', () => {
    expect(getReactDependencies(['IMask'])).toMatchSnapshot();
  });
});

describe('getTsconfigMarkup()', () => {
  it('should have correct tsconfig setup', () => {
    expect(getTsconfigMarkup()).toMatchSnapshot();
  });
});

describe('getReactProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    markup: 'Some markup',
    description: 'Some description',
    title: 'Some title',
    hasFrameworkMarkup: false,
    globalStyles: 'body {}',
    pdsComponents: ['p-text'],
  };

  it('should return correct project and openOptions', () => {
    const mockValue = 'Some value';

    jest.spyOn(reactBoilerplateUtils, 'getAppTsxMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(reactBoilerplateUtils, 'getIndexTsxMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(reactBoilerplateUtils, 'getReactDependencies').mockImplementationOnce(() => ({}));
    jest.spyOn(reactBoilerplateUtils, 'getTsconfigMarkup').mockImplementationOnce(() => '');

    const { project, openOptions } = getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);
    const { globalStyles, title, description } = stackBlitzFrameworkOpts;

    expect(project).toEqual({
      files: {
        'App.tsx': mockValue,
        'index.html': `<div id="root"></div>`,
        'index.tsx': mockValue,
        'tsconfig.json': '',
        'style.css': globalStyles,
      },
      template: 'create-react-app',
      title: title,
      description: description,
      dependencies: {},
    });

    expect(openOptions).toEqual({
      openFile: 'App.tsx',
    });
  });

  it('should call getAppTsxMarkup(), getIndexTsMarkup(), getTsconfigMarkup() and getDependencies() with correct parameters', () => {
    const { markup, hasFrameworkMarkup, pdsComponents } = stackBlitzFrameworkOpts;

    const getAppTsxMarkupSpy = jest.spyOn(reactBoilerplateUtils, 'getAppTsxMarkup');
    const isTableSpy = jest.spyOn(stackBlitzHelperUtils, 'isTable').mockImplementationOnce(() => false);
    const getIndexTsMarkupSpy = jest.spyOn(reactBoilerplateUtils, 'getIndexTsxMarkup');
    const getTsconfigMarkupSpy = jest.spyOn(reactBoilerplateUtils, 'getTsconfigMarkup');
    const getDependenciesSpy = jest.spyOn(reactBoilerplateUtils, 'getReactDependencies');

    getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);
    expect(getAppTsxMarkupSpy).toBeCalledWith(markup, hasFrameworkMarkup, false, pdsComponents);
    expect(isTableSpy).toBeCalledWith(pdsComponents);
    expect(getIndexTsMarkupSpy).toBeCalledWith();
    expect(getTsconfigMarkupSpy).toBeCalledWith();
    expect(getDependenciesSpy).toBeCalledWith(undefined);
  });
});
