import {
  getAngularDependencies,
  getAngularProjectAndOpenOptions,
  getAppComponentTsDefaultMarkup,
  getCleanedAngularMarkup,
  getComponentTsFrameworkMarkup,
  getComponentTsMarkup,
  getMainTsMarkup,
  getModuleTsMarkup,
  usesIMask,
} from '../../src/utils/stackblitz/angularBoilerplate';
import { StackBlitzFrameworkOpts } from '../../src/utils';

import * as angularBoilerplateUtils from '../../src/utils/stackblitz/angularBoilerplate';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';

describe('getCleanedAngularMarkup()', () => {
  it('should replace selector and class name correctly', () => {
    const markup = `@Component({
  selector: 'table-example-advanced',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableExampleAdvanced {}
}`;
    expect(getCleanedAngularMarkup(markup)).toMatchSnapshot();
  });
});

describe('getComponentTsFrameworkMarkup()', () => {
  it('should call getCleanedAngularMarkup() with correct parameters', () => {
    const markup = 'Some Markup';
    const spy = jest.spyOn(angularBoilerplateUtils, 'getCleanedAngularMarkup');

    getComponentTsFrameworkMarkup(markup, false);

    expect(spy).toBeCalledWith(markup);
  });

  it('should return cleanedMarkup when isTable = false', () => {
    const markup = 'Some Markup';
    const cleandMarkup = `Cleaned value`;
    jest.spyOn(angularBoilerplateUtils, 'getCleanedAngularMarkup').mockImplementationOnce(() => cleandMarkup);

    expect(getComponentTsFrameworkMarkup(markup, false)).toBe(cleandMarkup);
  });

  it('should call replaceSharedTableImports() with correct parameters when isTable = true', () => {
    const markup = 'Some Markup';
    const cleanedMarkup = `Cleaned value`;
    jest.spyOn(angularBoilerplateUtils, 'getCleanedAngularMarkup').mockImplementationOnce(() => cleanedMarkup);
    const replaceSharedTableImportsSpy = jest
      .spyOn(stackBlitzHelperUtils, 'inlineSharedImports')
      .mockImplementationOnce(() => cleanedMarkup);

    expect(getComponentTsFrameworkMarkup(markup, true)).toBe(cleanedMarkup);
    expect(replaceSharedTableImportsSpy).toBeCalledWith(cleanedMarkup);
  });
});

describe('getAppComponentTsDefaultMarkup()', () => {
  it('should call getAppComponentTsDefaultMarkup() with correct parameters', () => {
    const spy = jest.spyOn(formattingUtils, 'convertMarkup');
    const markup = 'Some markup';

    getAppComponentTsDefaultMarkup(markup);
    expect(spy).toBeCalledWith(markup, 'angular');
  });

  it('should return correct default markup', () => {
    expect(
      getAppComponentTsDefaultMarkup(`<p-text>Some Text</p-text>
<p-accordion>Some value</p-accordion>`)
    ).toMatchSnapshot();
  });
});

describe('getComponentTsMarkup()', () => {
  it('should call getComponentTsFrameworkMarkup() with correct parameters when hasFrameworkMarkup is true', () => {
    const spy = jest.spyOn(angularBoilerplateUtils, 'getComponentTsFrameworkMarkup');
    const markup = 'Some markup';
    const isTable = false;

    getComponentTsMarkup(markup, true, isTable);

    expect(spy).toBeCalledWith(markup, isTable);
  });

  it('should call getAppComponentTsDefaultMarkup() with correct parameters when hasFrameworkMarkup is false', () => {
    const spy = jest.spyOn(angularBoilerplateUtils, 'getAppComponentTsDefaultMarkup');
    const markup = 'Some Markup';

    getComponentTsMarkup(markup, false, false);

    expect(spy).toBeCalledWith(markup);
  });
});

describe('getComponentTsMarkup()', () => {
  it('should return correct markup', () => {
    expect(getMainTsMarkup()).toMatchSnapshot();
  });
});

describe('getModuleTsMarkup()', () => {
  it('should return correct markup for usesIMask = false', () => {
    expect(getModuleTsMarkup(false)).toMatchSnapshot();
  });

  it('should return correct markup for usesIMask = true', () => {
    expect(getModuleTsMarkup(true)).toMatchSnapshot();
  });
});

describe('getAngularDependencies()', () => {
  it('should return correct dependencies object without additionalDependencies', () => {
    expect(getAngularDependencies(false)).toMatchSnapshot();
  });

  it('should return correct dependencies object with additionalDependency "IMask"', () => {
    expect(getAngularDependencies(true, ['IMask'])).toMatchSnapshot();
  });
});

describe('usesIMask()', () => {
  it('should return true when additionalDependencies array contains "IMask"', () => {
    expect(usesIMask(['IMask'])).toBe(true);
  });

  it('should return false when additionalDependencies are undefined', () => {
    expect(usesIMask()).toBe(false);
  });

  it('should return false when additionalDependencies array does not contain "IMask"', () => {
    expect(usesIMask(['Dependency'])).toBe(false);
  });
});

describe('getAngularProjectAndOpenOptions()', () => {
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

    jest.spyOn(angularBoilerplateUtils, 'getMainTsMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(angularBoilerplateUtils, 'getComponentTsMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(angularBoilerplateUtils, 'getModuleTsMarkup').mockImplementationOnce(() => mockValue);
    jest.spyOn(angularBoilerplateUtils, 'getAngularDependencies').mockImplementationOnce(() => ({}));

    const { project, openOptions } = getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);
    const { bodyStyles, title, description } = stackBlitzFrameworkOpts;

    expect(project).toEqual({
      files: {
        'index.html': `<porsche-design-system-app></porsche-design-system-app>
${`<style>${bodyStyles}</style>`}`,
        'main.ts': mockValue,
        'app/app.component.ts': mockValue,
        'app/app.module.ts': mockValue,
      },
      template: 'angular-cli',
      title,
      description,
      dependencies: {},
    });
    expect(openOptions).toEqual({});
  });

  it('should call getMainTsMarkup(), getComponentTsMarkup(), getModuleTsMarkup and getAngularDependencies() with correct parameters', () => {
    const { markup, hasFrameworkMarkup, pdsComponents, additionalDependencies } = stackBlitzFrameworkOpts;

    const usesIMaskSpy = jest.spyOn(angularBoilerplateUtils, 'usesIMask').mockImplementationOnce(() => false);
    const getMainTsMarkupSpy = jest.spyOn(angularBoilerplateUtils, 'getMainTsMarkup');
    const getComponentTsMarkupSpy = jest.spyOn(angularBoilerplateUtils, 'getComponentTsMarkup');
    const getModuleTsMarkupSpy = jest.spyOn(angularBoilerplateUtils, 'getModuleTsMarkup');
    const getAngularDependenciesSpy = jest.spyOn(angularBoilerplateUtils, 'getAngularDependencies');
    const isTableSpy = jest.spyOn(stackBlitzHelperUtils, 'isTable').mockImplementationOnce(() => false);

    getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(usesIMaskSpy).toBeCalledWith(additionalDependencies);
    expect(getMainTsMarkupSpy).toBeCalledWith();
    expect(getComponentTsMarkupSpy).toBeCalledWith(markup, hasFrameworkMarkup, false);
    expect(isTableSpy).toBeCalledWith(pdsComponents);
    expect(getModuleTsMarkupSpy).toBeCalledWith(false);
    expect(getAngularDependenciesSpy).toBeCalledWith(false, additionalDependencies);
  });
});
