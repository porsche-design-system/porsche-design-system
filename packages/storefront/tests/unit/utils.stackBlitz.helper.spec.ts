import { themeDark, themeLight } from '@porsche-design-system/components-js/styles';
import type { PlaygroundTheme, BackgroundColor } from '../../src/models';
import {
  getExternalDependencies,
  getBackgroundColor,
  getSharedImportConstants,
  removeSharedImport,
  getExternalDependenciesOrThrow,
  isStableStorefrontRelease,
  convertImportPaths,
  transformSrcAndSrcsetOfImgAndSourceTags,
  isStableStorefrontReleaseOrForcedPdsVersion,
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

    expect(spy).toHaveBeenCalledWith(/\s*import { .+ } from '@porsche-design-system\/shared';/, '');
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
  it.each<[PlaygroundTheme, BackgroundColor, string]>([
    ['light', 'background-base', themeLight.background.base],
    ['light', 'background-surface', themeLight.background.surface],
    ['dark', 'background-base', themeDark.background.base],
    ['dark', 'background-surface', themeDark.background.surface],
  ])('should for Theme: %s, backgroundColor: %s return %s', (theme, colorScheme, expected) => {
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
  // TODO: global flag isn't covered, stable release check as well
  const markup = `
'import * from '@porsche-design-system/components-js';
'import * from '@porsche-design-system/components-angular';
'import * from '@porsche-design-system/components-react';
'import * from '@porsche-design-system/components-vue';
`;

  it('should return markup without modification', () => {
    jest.spyOn(helper, 'isStableStorefrontReleaseOrForcedPdsVersion').mockReturnValue(true);
    expect(convertImportPaths(markup, 'vanilla-js', '1.2.3')).toMatchSnapshot();
  });

  it('should return markup with updated import path for js', () => {
    jest.spyOn(helper, 'isStableStorefrontReleaseOrForcedPdsVersion').mockReturnValue(false);
    expect(convertImportPaths(markup, 'vanilla-js', '1.2.3')).toMatchSnapshot();
  });

  it('should return markup with updated import path for angular', () => {
    jest.spyOn(helper, 'isStableStorefrontReleaseOrForcedPdsVersion').mockReturnValue(false);
    expect(convertImportPaths(markup, 'angular', '1.2.3')).toMatchSnapshot();
  });

  it('should return markup with updated import path for react', () => {
    jest.spyOn(helper, 'isStableStorefrontReleaseOrForcedPdsVersion').mockReturnValue(false);
    expect(convertImportPaths(markup, 'react', '1.2.3')).toMatchSnapshot();
  });

  it('should return markup with updated import path for vue', () => {
    jest.spyOn(helper, 'isStableStorefrontReleaseOrForcedPdsVersion').mockReturnValue(false);
    expect(convertImportPaths(markup, 'vue', '1.2.3')).toMatchSnapshot();
  });
});

describe('transformSrcAndSrcsetOfImgAndSourceTags()', () => {
  it.each<[string, string]>([
    [
      '<source media="(min-width:400px)" srcset="img/image.png">',
      '<source media="(min-width:400px)" srcset="http://localhost/img/image.png">',
    ],
    ['<img src="img/image.png" alt="Some alt text">', '<img src="http://localhost/img/image.png" alt="Some alt text">'],
  ])(
    'should for input: %s and output: %s correctly transform src / srcset and call document.querySelector() and getAttribute() with correct parameters',
    (input, output) => {
      const div = document.createElement('div');
      const querySelectorSpy = jest.spyOn(document, 'querySelector').mockReturnValueOnce(div);
      const getAttributeSpy = jest.spyOn(div, 'getAttribute');

      expect(transformSrcAndSrcsetOfImgAndSourceTags(input)).toBe(output);
      expect(querySelectorSpy).toHaveBeenCalledWith('base');
      expect(getAttributeSpy).toHaveBeenCalledWith('href');
    }
  );

  it.each<string>([
    '<source media="(min-width:400px)" srcset="http://image.png">',
    '<source media="(min-width:400px)" srcset="https://image.png">',
    '<source media="(min-width:400px)" srcset="./img/image.png">',
    '<img src="http://image.png" alt="Some alt text">',
    '<img src="https://image.png" alt="Some alt text">',
    '<img src="https:./img/image.png" alt="Some alt text">',
  ])('should not transform src and srcset for input: %s ', (input) => {
    expect(transformSrcAndSrcsetOfImgAndSourceTags(input)).toBe(input);
  });
});

describe('isStableStorefrontReleaseOrForcedPdsVersion()', () => {
  it('should call isStableStorefrontRelease() with correct parameters', () => {
    const spy = jest.spyOn(helper, 'isStableStorefrontRelease');
    isStableStorefrontReleaseOrForcedPdsVersion('');
    expect(spy).toHaveBeenCalledWith();
  });

  it.each<[string, boolean, boolean]>([
    ['1.2.3', true, true],
    ['', true, true],
    ['1.2.3', false, true],
    ['', false, false],
  ])(
    'should for pdsVersion: %s, isStableStorefrontRelease: %s return %s',
    (pdsVersion, isStableStorefrontRelease, expected) => {
      jest.spyOn(helper, 'isStableStorefrontRelease').mockReturnValue(isStableStorefrontRelease);

      expect(isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion)).toBe(expected);
    }
  );
});
