import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import type { Theme, ColorScheme } from './../../src/models/index';
import {
  getAdditionalDependencies,
  getBackgroundColor,
  getPdsComponents,
  isTable,
  replaceSharedTableImports,
} from '../../src/utils/stackblitz/helper';

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

describe('getAdditionalDependencies()', () => {
  const dependenciesMap = {
    dependencyAlias1: {
      dependency1: '0.0.0',
      dependency2: '0.0.0',
    },
    dependencyAlias2: {
      dependency3: '0.0.0',
      dependency4: '0.0.0',
    },
  };

  it('should map correct values depending on additionalDependencies array', () => {
    expect(getAdditionalDependencies(['dependencyAlias1'], dependenciesMap)).toEqual({
      ...dependenciesMap.dependencyAlias1,
    });
    expect(getAdditionalDependencies(['dependencyAlias1', 'dependencyAlias2'], dependenciesMap)).toEqual({
      ...dependenciesMap.dependencyAlias1,
      ...dependenciesMap.dependencyAlias2,
    });
  });
});

describe('isTable()', () => {
  it('should be true if first string contains table', () => {
    expect(isTable(['p-table', 'p-text'])).toBe(true);
  });
  it('should be false if first string does not contain table', () => {
    expect(isTable(['p-accordion', 'p-text'])).toBe(false);
  });
});

describe('replaceSharedTableImports()', () => {
  it('should correctly replace shared import for table basic', () => {
    expect(
      replaceSharedTableImports("import { dataBasic, headBasic } from '@porsche-design-system/shared';")
    ).toMatchSnapshot();
  });
  it('should correctly replace shared import for table sorting', () => {
    expect(
      replaceSharedTableImports(
        "import { dataSorting, DataSorting, headSorting } from '@porsche-design-system/shared';"
      )
    ).toMatchSnapshot();
  });
  it('should correctly replace shared import for table advanced', () => {
    expect(
      replaceSharedTableImports(
        "import { dataAdvanced, DataAdvanced, headAdvanced } from '@porsche-design-system/shared';"
      )
    ).toMatchSnapshot();
  });
});

describe('getPdsComponents()', () => {
  it('should return all Pds components without duplicates', () => {
    const markup =
      '<p-text>Some Text</p-text><p-accordion><p-text>Some Text</p-text></p-accordion><p-table></p-table><button></button><p></p>';
    expect(getPdsComponents(markup)).toEqual(['p-text', 'p-accordion', 'p-table']);
  });
});
