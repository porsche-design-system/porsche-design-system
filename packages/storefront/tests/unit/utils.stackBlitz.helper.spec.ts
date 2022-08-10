import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import type { Theme, ColorScheme } from './../../src/models/index';
import {
  getExternalDependencies,
  getBackgroundColor,
  getSharedImportConstants,
  removeSharedImport,
  SharedImportKey,
} from '../../src/utils/stackblitz/helper';

describe('removeSharedImport()', () => {
  it('should remove shared import from markup', () => {
    const sharedImportMarkup = "import { headBasic, dataBasic } from '@porsche-design-system/shared';";
    expect(removeSharedImport(sharedImportMarkup)).toBe('');
  });

  it('should not change markup if no shared import is present', () => {
    const someMarkup = 'Some Markup';
    expect(removeSharedImport(someMarkup)).toBe(someMarkup);
  });
});

describe('getSharedImportConstants()', () => {
  it('should return empty string if no sharedImportKeys are passed', () => {
    expect(getSharedImportConstants([])).toBe('');
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

  it('should map correct values depending on additionalDependencies array', () => {
    expect(getExternalDependencies(['imask'], dependenciesMap)).toEqual({
      ...dependenciesMap.imask,
    });
  });
});
