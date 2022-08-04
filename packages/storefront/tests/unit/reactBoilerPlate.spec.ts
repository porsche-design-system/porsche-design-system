import {
  getAppDefaultMarkup,
  getAppFrameworkMarkup,
  getAppTsxMarkup,
  getCleanedReactMarkup,
  getDependencies,
  getIndexTsMarkup,
  getReactProjectAndOpenOptions,
} from '../../src/utils/stackblitz/reactBoilerplate';

import * as reactBoilerplateUtils from '../../src/utils/stackblitz/reactBoilerplate';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';
import { StackBlitzFrameworkOpts } from '../../src/utils/stackblitz/helper';

const sharedProps = {
  description: 'Some description',
  title: 'Some title',
  bodyStyles: 'body {}',
};

describe('getCleanedReactMarkup()', () => {
  it('should replace function name with "App"', () => {
    const expected = 'export const App = (): JSX.Element => {';
    expect(getCleanedReactMarkup('export const TableExampleAdvanced = (): JSX.Element => {')).toBe(expected);
    expect(getCleanedReactMarkup('export const AccordionExample = (): JSX.Element => {')).toBe(expected);
  });
});

describe('getAppFrameworkMarkup()', () => {
  it('should call getCleanedMarkup() with correct parameters and return cleanedMarkup when isTable = false', () => {
    const markup = 'Some Markup';
    const cleandMarkup = `Cleaned value`;
    const spy = jest.spyOn(reactBoilerplateUtils, 'getCleanedReactMarkup').mockReturnValue(cleandMarkup);

    expect(getAppFrameworkMarkup(markup, false)).toBe(`import React from 'react';
${cleandMarkup}`);
    expect(spy).toBeCalledWith(markup);
  });

  it('should call getCleanedMarkup() & replaceSharedTableImports() with correct parameters when isTable = true', () => {
    const markup = 'Some Markup';
    const cleanedMarkup = `Cleaned value`;

    const getCleanedMarkupSpy = jest
      .spyOn(reactBoilerplateUtils, 'getCleanedReactMarkup')
      .mockReturnValue(cleanedMarkup);
    const replaceSharedTableImports = jest
      .spyOn(stackBlitzHelperUtils, 'replaceSharedTableImports')
      .mockImplementationOnce(() => cleanedMarkup);

    expect(getAppFrameworkMarkup(markup, true)).toBe(`import React from 'react';
${cleanedMarkup}`);
    expect(getCleanedMarkupSpy).toBeCalledWith(markup);
    expect(replaceSharedTableImports).toBeCalledWith(cleanedMarkup);
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
    const markup = 'Some Markup';
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
    expect(getIndexTsMarkup()).toMatchSnapshot();
  });
});

describe('getDependencies()', () => {
  it('should return correct dependencies object without additionalDependencies', () => {
    expect(getDependencies()).toMatchSnapshot();
  });

  it('should return correct dependencies object with additionalDependency "IMask"', () => {
    expect(getDependencies(['IMask'])).toMatchSnapshot();
  });
});

describe('getReactProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    markup: 'Some markup',
    description: 'Some description',
    title: 'Some title',
    hasFrameworkMarkup: false,
    bodyStyles: 'body {}',
    pdsComponents: ['p-text'],
  };

  it('should return correct project and openOptions', () => {
    const mockValue = 'Some value';
    jest.spyOn(reactBoilerplateUtils, 'getAppTsxMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(reactBoilerplateUtils, 'getIndexTsMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(reactBoilerplateUtils, 'getDependencies').mockImplementationOnce(() => ({}));

    const { project, openOptions } = getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(project).toEqual({
      files: {
        'App.tsx': mockValue,
        'index.html': `<div id="root"></div>`,
        'index.tsx': mockValue,
        'style.css': stackBlitzFrameworkOpts.bodyStyles,
      },
      template: 'create-react-app',
      title: stackBlitzFrameworkOpts.title,
      description: stackBlitzFrameworkOpts.description,
      dependencies: {},
    });

    expect(openOptions).toEqual({
      openFile: 'App.tsx',
    });
  });

  it('should call getAppTsxMarkup(), getIndexTsMarkup() and getDependencies() with correct parameters', () => {
    const { markup, hasFrameworkMarkup, pdsComponents } = stackBlitzFrameworkOpts;

    const mockValue = 'Some value';
    const getAppTsxMarkupSpy = jest
      .spyOn(reactBoilerplateUtils, 'getAppTsxMarkup')
      .mockImplementationOnce(() => mockValue);
    const isTableSpy = jest.spyOn(stackBlitzHelperUtils, 'isTable').mockImplementationOnce(() => false);
    const getIndexTsMarkupSpy = jest
      .spyOn(reactBoilerplateUtils, 'getIndexTsMarkup')
      .mockImplementationOnce(() => mockValue);
    const getDependenciesSpy = jest.spyOn(reactBoilerplateUtils, 'getDependencies').mockImplementationOnce(() => ({}));

    getReactProjectAndOpenOptions(stackBlitzFrameworkOpts);
    expect(getAppTsxMarkupSpy).toBeCalledWith(markup, hasFrameworkMarkup, false, pdsComponents);
    expect(isTableSpy).toBeCalledWith(pdsComponents);
    expect(getIndexTsMarkupSpy).toBeCalledWith();
    expect(getDependenciesSpy).toBeCalledWith(undefined);
  });
});
