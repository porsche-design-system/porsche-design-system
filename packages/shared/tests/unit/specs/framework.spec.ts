import { describe, expect, it } from 'vitest';
import {
  FRAMEWORKS,
  frameworkNameMap,
  frameworkSuffixMap,
  getWrapperPackageName,
  isFramework,
} from '../../../src/models/framework';

describe('isFramework()', () => {
  it.each(FRAMEWORKS)('should accept %s', (framework) => {
    expect(isFramework(framework)).toBe(true);
  });

  it.each(['js', 'next', 'svelte', '', undefined])('should reject %s', (value) => {
    expect(isFramework(value)).toBe(false);
  });
});

describe('framework vocabulary', () => {
  it('should name, suffix and package every framework', () => {
    expect(
      FRAMEWORKS.map((framework) => [
        framework,
        frameworkNameMap[framework],
        frameworkSuffixMap[framework],
        getWrapperPackageName(framework),
      ])
    ).toEqual([
      ['vanilla-js', 'Vanilla JS', 'js', '@porsche-design-system/components-js'],
      ['angular', 'Angular', 'angular', '@porsche-design-system/components-angular'],
      ['react', 'React', 'react', '@porsche-design-system/components-react'],
      ['vue', 'Vue', 'vue', '@porsche-design-system/components-vue'],
    ]);
  });
});
