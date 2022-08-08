import {
  extendMarkupWithSharedTableData,
  getFrameworkMarkup,
  getIndexHtmlMarkup,
  getIndexJsMarkup,
  getVanillaJsDependencies,
  getVanillaJsProjectAndOpenOptions,
} from '../../src/utils/stackblitz/vanillaJsBoilerplate';
import { isTable } from '../../src/utils/stackblitz/helper';
import type { StackBlitzFrameworkOpts } from '../../src/utils';

import * as vanillaJsBoilerplateUtils from '../../src/utils/stackblitz/vanillaJsBoilerplate';
import * as formattingUtils from '../../src/utils/formatting';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';

describe('getFrameworkMarkup()', () => {
  it('should call extendMarkupWithSharedTableData() with correct parameter when isTable = true', () => {
    const spy = jest
      .spyOn(vanillaJsBoilerplateUtils, 'extendMarkupWithSharedTableData')
      .mockImplementationOnce(() => '');
    const markup = 'Some markup';

    getFrameworkMarkup(markup, true);

    expect(spy).toBeCalledWith(markup);
  });

  it('should return passed markup isTable = false', () => {
    const markup = 'Some markup';

    expect(getFrameworkMarkup(markup, false)).toBe(markup);
  });
});

describe('getIndexHtmlMarkup()', () => {
  it('should call getFrameworkMarkup() with correct parameter when hasFrameworkMarkup = true', () => {
    const spy = jest.spyOn(vanillaJsBoilerplateUtils, 'getFrameworkMarkup');

    const markup = 'Some markup';
    const isTable = false;
    getIndexHtmlMarkup(markup, true, isTable);

    expect(spy).toBeCalledWith(markup, isTable);
  });

  it('should call convertMarkup() when isTable = false', () => {
    const spy = jest.spyOn(formattingUtils, 'convertMarkup');
    const markup = 'Some markup';
    getIndexHtmlMarkup(markup, false, false);

    expect(spy).toBeCalledWith(markup, 'vanilla-js');
  });
});

describe('getIndexJsMarkup()', () => {
  it('should return correct markup without additionlDependency', () => {
    expect(getIndexJsMarkup()).toMatchSnapshot();
  });

  it('should return correct markup without additionalDependency "IMask"', () => {
    expect(getIndexJsMarkup(['IMask'])).toMatchSnapshot();
  });
});

describe('extendMarkupWithSharedTableData()', () => {
  it('should return correct markup for basic example', () => {
    const markup = `<script>
  (async () => {
    const { headBasic, dataBasic } = await getHeadAndData();

    const renderTableHeadRow = (items) =>`;

    expect(extendMarkupWithSharedTableData(markup)).toMatchSnapshot();
  });

  it('should return correct markup for sorting example', () => {
    const markup = `<script>
  (async () => {
    const { headSorting, dataSorting } = await getHeadAndData();

    const renderTableHeadRow = (items) =>`;

    expect(extendMarkupWithSharedTableData(markup)).toMatchSnapshot();
  });

  it('should return correct markup for advanced example', () => {
    const markup = `<script>
  (async () => {
    const { headAdvanced, dataAdvanced } = await getHeadAndData();

    const renderTableHeadRow = (items) =>`;

    expect(extendMarkupWithSharedTableData(markup)).toMatchSnapshot();
  });
});

describe('getVanillaJsDependencies()', () => {
  it('should return correct dependencies without additionalDependencies', () => {
    expect(getVanillaJsDependencies()).toMatchSnapshot();
  });

  it('should return correct markup with additionalDependency "IMask"', () => {
    expect(getVanillaJsDependencies(['IMask'])).toMatchSnapshot();
  });
});

describe('getVanillaJsProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    markup: 'Some markup',
    description: 'Some description',
    title: 'Some title',
    hasFrameworkMarkup: false,
    bodyStyles: 'body {}',
    pdsComponents: ['p-text'],
  };

  it('should return correct project and openOptions', () => {
    const { bodyStyles, title, description } = stackBlitzFrameworkOpts;
    const mockValue = 'Some value';

    jest.spyOn(vanillaJsBoilerplateUtils, 'getIndexHtmlMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(vanillaJsBoilerplateUtils, 'getIndexJsMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(vanillaJsBoilerplateUtils, 'getVanillaJsDependencies').mockImplementationOnce(() => ({}));

    const { project, openOptions } = getVanillaJsProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(project).toEqual({
      files: {
        'index.html': mockValue,
        'index.js': mockValue,
        'style.css': bodyStyles,
      },
      template: 'javascript',
      title,
      description,
      dependencies: {},
    });

    expect(openOptions).toEqual({
      openFile: 'index.html',
    });
  });

  it('should call getIndexHtmlMarkup(), getIndexJsMarkup(), getVanillaJsDependencies() and isTable()  with correct parameters', () => {
    const { markup, hasFrameworkMarkup, pdsComponents } = stackBlitzFrameworkOpts;

    const getIndexHtmlMarkupSpy = jest.spyOn(vanillaJsBoilerplateUtils, 'getIndexHtmlMarkup');
    const getIndexJsMarkupSpy = jest.spyOn(vanillaJsBoilerplateUtils, 'getIndexJsMarkup');
    const getVanillaJsDependenciesSpy = jest.spyOn(vanillaJsBoilerplateUtils, 'getVanillaJsDependencies');
    const isTableSpy = jest.spyOn(stackBlitzHelperUtils, 'isTable').mockImplementationOnce(() => false);

    getVanillaJsProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(getIndexHtmlMarkupSpy).toBeCalledWith(markup, hasFrameworkMarkup, false);
    expect(getIndexJsMarkupSpy).toBeCalledWith(undefined);
    expect(getVanillaJsDependenciesSpy).toBeCalledWith(undefined);
    expect(isTableSpy).toBeCalledWith(pdsComponents);
  });
});
