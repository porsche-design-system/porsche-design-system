import { getAdditionalDependencies, getBackgroundColor } from './../../src/utils/stackblitz/openInStackBlitz';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import type { Theme, ColorScheme } from './../../src/models/index';

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
