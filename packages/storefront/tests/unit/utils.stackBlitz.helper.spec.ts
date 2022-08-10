import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import type { Theme, ColorScheme } from '../../src/models';
import {
  getExternalDependencies,
  getBackgroundColor,
  getSharedImportConstants,
  removeSharedImport,
  validateExternalDependencies,
} from '../../src/utils/stackblitz/helper';
import type { SharedImportKey, ExternalDependency } from '../../src/utils';

jest.mock('@porsche-design-system/shared/data', () => ({
  headBasic: 'mockedHeadBasic',
  dataBasic: 'mockedDataBasic',
}));

describe('removeSharedImport()', () => {
  const markup = 'Some markup';

  it('should call replace() with correct parameters', () => {
    const replaceMockValue = 'Some mock value';
    const spy = jest.spyOn(String.prototype, 'replace').mockReturnValue(replaceMockValue);

    removeSharedImport(markup);

    expect(spy).toBeCalledWith(/import { .+ } from '@porsche-design-system\/shared';/, '');
  });

  it('should return unmodified markup parameter if regex does not match', () => {
    expect(removeSharedImport(markup)).toBe(markup);
  });
});

describe('getSharedImportConstants()', () => {
  it('should return empty string for [] as sharedImportKeys', () => {
    expect(getSharedImportConstants([])).toBe('');
  });

  // TODO: which approach is better?
  it('should return constants and value for', () => {
    const expected = 'const headBasic = "mockedHeadBasic";\n\nconst dataBasic = "mockedDataBasic";\n\n';

    expect(getSharedImportConstants(['headBasic', 'dataBasic'])).toBe(expected);
  });

  it.each<SharedImportKey[][]>([
    [['headBasic', 'dataBasic']],
    [['headAdvanced', 'dataAdvanced']],
    [['headSorting', 'dataSorting']],
  ])('should for %o return correct const name and value', (sharedImportKeys) => {
    expect(getSharedImportConstants(sharedImportKeys)).toMatchSnapshot();
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

describe('getExternalDependencies()', () => {
  const dependenciesMap = {
    imask: {
      imask: '0.0.0',
      'imask-react': '0.0.0',
    },
  };

  it('should return correct ExternalDependency[]', () => {
    expect(getExternalDependencies(['imask'], dependenciesMap)).toEqual({
      ...dependenciesMap.imask,
    });
  });
});

describe('validateExternalDependencies()', () => {
  it('should throw error if invalid externalDependency is passed', () => {
    // @ts-ignore
    expect(() => validateExternalDependencies(['invalid'])).toThrowErrorMatchingSnapshot();
  });

  it('should return passed externalDependencies[] if values are valid', () => {
    const externalDependencies: ExternalDependency[] = ['imask'];
    expect(validateExternalDependencies(externalDependencies)).toBe(externalDependencies);
  });
});
