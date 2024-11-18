import {
  dependencyMap,
  extendMarkupWithAppComponent,
  getDependencies,
  getAngularProjectAndOpenOptions,
  getAppModuleTs,
  getAppComponentTs,
  getIndexHtml,
  getMainTs,
  replaceSharedImportsWithConstants,
  hasMarkupInlineScss,
  extractInlineStyles,
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
    '@porsche-design-system/components-angular': '0.0.0',
    imask: '0.0.0',
    'angular-imask': '0.0.0',
  },
  devDependencies: {
    'ag-grid-community': '0.0.0',
    'ag-grid-angular': '0.0.0',
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
    const mockedReplaceValue = 'Some mocked value';
    const spy = jest.spyOn(stackBlitzHelperUtils, 'removeSharedImport');
    jest.spyOn(String.prototype, 'replace').mockReturnValue(mockedReplaceValue);

    replaceSharedImportsWithConstants(markup, sharedImportKeys);

    expect(spy).toHaveBeenCalledWith(mockedReplaceValue);
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
    expect(spy).toHaveBeenNthCalledWith(2, /(export class )[a-zA-Z]+( {)/, '$1AppComponent$2');
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

    expect(spy).toHaveBeenCalledWith(markup, 'angular');
  });

  it('should call replace() with correct parameters', () => {
    const spy = jest.spyOn(String.prototype, 'replace');

    extendMarkupWithAppComponent('Some Markup');

    expect(spy).toHaveBeenCalledWith(/(\n)/g, '$1    ');
  });

  it('should return correct markup', () => {
    const mockedConvertMarkup = 'Some mocked markup';

    jest.spyOn(formattingUtils, 'convertMarkup').mockReturnValue(mockedConvertMarkup);
    expect(extendMarkupWithAppComponent('Some Markup')).toMatchSnapshot();
  });
});

describe('hasMarkupInlineScss()', () => {
  const template = `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-example',{{PLACEHOLDER}}
  template: \`
    <div></div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {}
`;

  it.each<[string, boolean]>([
    ['', false],
    ['div { background: red; }', false],
    ['.class { background: red; }', false],
    [
      `@media only screen and (min-width: 760px) {
  .class { background: red; }
}`,
      false,
    ],
    [`@use '@porsche-design-system/components-js/styles' as *;`, true],
    [`@use '@porsche-design-system/components-angular/styles/scss';`, true],
  ])('should for styles: %s return: %s', (styles, result) => {
    styles = styles
      ? `\n  styles: [
    \`
      ${styles.replace(/\n/g, '$&      ')}
    \`
  ],`
      : styles;

    const input = template.replace('{{PLACEHOLDER}}', styles);
    expect(hasMarkupInlineScss(input)).toBe(result);
  });
});

describe('extractInlineStyles()', () => {
  const input = `@Component({
  selector: 'page-styles-border-example',
  styles: [
    \`
      @use '@porsche-design-system/components-js/styles' as *;
      .div {
        color: $pds-theme-light-primary;
      }
    \`,
  ],
  template: \` <div></div> \`,
})
export class ExampleComponent {}`;

  it('should extract inline styles for stable version', () => {
    expect(extractInlineStyles(input, '1.2.3')).toMatchSnapshot();
  });

  it('should extract inline styles for temporary version', () => {
    expect(extractInlineStyles(input, '')).toMatchSnapshot();
  });
});

describe('getAppComponentTs()', () => {
  it('should call convertImportPaths() + replaceSharedImportsWithConstants()', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(
      getAngularProjectAndOpenOptionsUtils,
      'replaceSharedImportsWithConstants'
    );
    const extendMarkupWithAppComponentSpy = jest.spyOn(
      getAngularProjectAndOpenOptionsUtils,
      'extendMarkupWithAppComponent'
    );

    getAppComponentTs('some markup', true, [], '', false);

    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
    expect(replaceSharedImportsWithConstantsSpy).toHaveBeenCalledWith('some markup', []);
    expect(extendMarkupWithAppComponentSpy).not.toHaveBeenCalled();
  });

  it('should call convertImportPaths() + extendMarkupWithAppComponent()', () => {
    const convertImportPathsSpy = jest.spyOn(stackBlitzHelperUtils, 'convertImportPaths');
    const replaceSharedImportsWithConstantsSpy = jest.spyOn(
      getAngularProjectAndOpenOptionsUtils,
      'replaceSharedImportsWithConstants'
    );
    const extendMarkupWithAppComponentSpy = jest.spyOn(
      getAngularProjectAndOpenOptionsUtils,
      'extendMarkupWithAppComponent'
    );

    getAppComponentTs('some markup', false, [], '', false);

    expect(convertImportPathsSpy).toHaveBeenCalledTimes(1);
    expect(replaceSharedImportsWithConstantsSpy).not.toHaveBeenCalled();
    expect(extendMarkupWithAppComponentSpy).toHaveBeenCalledWith('some markup');
  });

  it('should replace styles with styleUrls for hasInlineScss = true', () => {
    const input = `@Component({
  selector: 'page-styles-border-example',
  styles: [
    \`
      @use '@porsche-design-system/components-js/styles' as *;
      .div {
        color: $pds-theme-light-primary;
      }
    \`,
  ],
  template: \` <div></div> \`,
})
export class ExampleComponent {}`;

    const result = getAppComponentTs(input, true, [], '', true);

    expect(result).toMatchSnapshot();
  });
});

describe('getAppModuleTs()', () => {
  describe('development mode or non stable storefront release (e.g. /issue/…, /release/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(false);
    });

    it('should return correct markup for [] as externalDependencies', () => {
      expect(getAppModuleTs([], '')).toMatchSnapshot();
    });

    it('should return correct markup with externalDependencies', () => {
      expect(getAppModuleTs(['imask'], '')).toMatchSnapshot();
    });

    it('should return correct markup with passed pdsVersion', () => {
      expect(getAppModuleTs([], '1.2.3')).toMatchSnapshot();
    });
  });

  describe('stable storefront release (e.g. /v2/…, /v3/…)', () => {
    beforeEach(() => {
      jest.spyOn(stackBlitzHelperUtils, 'isStableStorefrontRelease').mockReturnValue(true);
    });

    it('should return correct markup for [] as externalDependencies', () => {
      expect(getAppModuleTs([], '')).toMatchSnapshot();
    });

    it('should return correct markup with externalDependencies', () => {
      expect(getAppModuleTs(['imask'], '')).toMatchSnapshot();
    });

    it('should return correct markup with passed pdsVersion', () => {
      expect(getAppModuleTs([], '1.2.3')).toMatchSnapshot();
    });
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
      ...expectedDefaultDependencies,
      '@porsche-design-system/components-angular': '1.2.3',
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
      ...expectedDefaultDependencies,
      '@porsche-design-system/components-angular': '1.2.3',
      ...mockedDependency,
    });
  });
});

describe('getAngularProjectAndOpenOptions()', () => {
  const stackBlitzFrameworkOpts: StackBlitzFrameworkOpts = {
    porscheDesignSystemBundle: {
      '@porsche-design-system/components-js/package.json': 'some package.json',
      '@porsche-design-system/components-angular/package.json': 'some package.json',
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
    const getAppComponentTsSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAppComponentTs');
    const getAppModuleTsSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAppModuleTs');
    const getIndexHtmlSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getIndexHtml');
    const getDependenciesSpy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getDependencies');

    getAngularProjectAndOpenOptions(stackBlitzFrameworkOpts);

    expect(isStableStorefrontReleaseSpy).toHaveBeenCalled();
    expect(getAppComponentTsSpy).toHaveBeenCalledWith(
      stackBlitzFrameworkOpts.markup,
      false,
      stackBlitzFrameworkOpts.sharedImportKeys,
      '',
      false
    );
    expect(getAppModuleTsSpy).toHaveBeenCalledWith(stackBlitzFrameworkOpts.externalDependencies, '');
    expect(getIndexHtmlSpy).toHaveBeenCalledWith(stackBlitzFrameworkOpts.dir, stackBlitzFrameworkOpts.globalStyles);
    expect(getDependenciesSpy).toHaveBeenCalledWith(stackBlitzFrameworkOpts.externalDependencies, '');
  });

  it('should return correct StackBlitzProjectAndOpenOptions', () => {
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

    expect(result).toEqual({
      files: {
        ...stackBlitzFrameworkOpts.porscheDesignSystemBundle,
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
});
