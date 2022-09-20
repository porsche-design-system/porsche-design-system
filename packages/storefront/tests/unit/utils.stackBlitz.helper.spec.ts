import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import type { Theme, ColorScheme } from '../../src/models';
import {
  getExternalDependencies,
  getBackgroundColor,
  getSharedImportConstants,
  removeSharedImport,
  getExternalDependenciesOrThrow,
  isStableStorefrontRelease, convertImportPaths,
} from '../../src/utils/stackblitz/helper';
import type { ExternalDependency } from '../../src/utils';
import * as helper from '../../src/utils/stackblitz/helper';

jest.mock('@porsche-design-system/shared/data', () => ({
  headBasic: 'mockedHeadBasic',
  dataBasic: 'mockedDataBasic',
}));

describe('removeSharedImport()', () => {
  const markup = 'Some markup';

  it('should call replace() with correct parameters', () => {
    const spy = jest.spyOn(String.prototype, 'replace');

    removeSharedImport(markup);

    expect(spy).toBeCalledWith(/import { .+ } from '@porsche-design-system\/shared';/, '');
  });

  it('should return result of replace()', () => {
    const replaceMockValue = 'Some mock value';
    jest.spyOn(String.prototype, 'replace').mockReturnValue(replaceMockValue);

    expect(removeSharedImport(markup)).toBe(replaceMockValue);
  });

  it('should return unmodified markup parameter if regex does not match', () => {
    expect(removeSharedImport(markup)).toBe(markup);
  });
});

describe('getSharedImportConstants()', () => {
  it('should return empty string for [] as sharedImportKeys', () => {
    expect(getSharedImportConstants([])).toBe('');
  });

  it('should return constants and value for', () => {
    const expected = 'const headBasic = "mockedHeadBasic";\n\nconst dataBasic = "mockedDataBasic";\n\n';

    expect(getSharedImportConstants(['headBasic', 'dataBasic'])).toBe(expected);
  });
});

describe('getExternalDependencies()', () => {
  const dependenciesMap = {
    imask: {
      imask: '0.0.0',
      'imask-react': '0.0.0',
    },
    externalDep: {
      temp: '0.0.0',
    },
  };

  it('should return correct ExternalDependency[]', () => {
    expect(getExternalDependencies(['imask'], dependenciesMap)).toEqual(dependenciesMap.imask);
  });
});

describe('getBackgroundColor()', () => {
  it.each<[Theme, ColorScheme, string]>([
    ['light', 'default', themeLight.background.base],
    ['light', 'surface', themeLight.background.surface],
    ['dark', 'default', themeDark.background.base],
    ['dark', 'surface', themeDark.background.surface],
  ])('should for Theme: %s, colorScheme: %s return %s', (theme, colorScheme, expected) => {
    expect(getBackgroundColor(theme, colorScheme)).toBe(expected);
  });
});

describe('validateExternalDependencies()', () => {
  it('should throw error if invalid externalDependency is passed', () => {
    expect(() => getExternalDependenciesOrThrow(['invalid'] as any)).toThrowErrorMatchingSnapshot();
    expect(() => getExternalDependenciesOrThrow(['imask', 'something-else'] as any)).toThrowError();
  });

  it('should return passed externalDependencies[] if values are valid', () => {
    const externalDependencies: ExternalDependency[] = ['imask'];
    expect(getExternalDependenciesOrThrow(externalDependencies)).toBe(externalDependencies);
  });
});

describe('isStableStorefrontRelease()', () => {
  const { location } = window;
  const mockPathname = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        get pathname() {
          return mockPathname();
        },
      },
    });
  });

  afterAll(() => {
    // @ts-ignore
    delete window.location;
    window.location = location;
  });

  it.each<[string, boolean]>([
    ['/issue/123', false],
    ['/release/123', false],
    ['/latest', false],
    ['/latest/', false],
    ['/', false],
    ['/v', false],
    ['/v1/', true],
    ['/v1', false],
    ['/v2/', true],
    ['/v2', false],
    ['/v33/', true],
    ['/v33', false],
  ])('should for path: %s return %s', (path, expected) => {
    mockPathname.mockReturnValue(path);
    expect(isStableStorefrontRelease()).toBe(expected);
  });
});

describe('convertImportPaths()', () => {
  const markup = `
'import * from '@porsche-design-system/components-js';
'import * from '@porsche-design-system/components-angular';
'import * from '@porsche-design-system/components-react';`;

  it('should return markup without modification', () => {
    jest.spyOn(helper, 'isStableStorefrontRelease').mockReturnValue(true);

    expect(convertImportPaths(markup, 'js')).toMatchSnapshot();
  });

  it('should return markup without updated import path for js', () => {
    jest.spyOn(helper, 'isStableStorefrontRelease').mockReturnValue(false);

    expect(convertImportPaths(markup, 'js')).toMatchSnapshot();
  });

  it('should return markup without updated import path for angular', () => {
    jest.spyOn(helper, 'isStableStorefrontRelease').mockReturnValue(false);

    expect(convertImportPaths(markup, 'angular')).toMatchSnapshot();
  });
  it('should return markup without updated import path for react', () => {
    jest.spyOn(helper, 'isStableStorefrontRelease').mockReturnValue(false);

    expect(convertImportPaths(markup, 'react')).toMatchSnapshot();
  });
});
