import { describe, expect, it } from 'vitest';
import { getFrameworkRenderContext, resolveFrameworkValues } from '@/models/framework';
import { normalizeCodeBlock } from '@/utils/normalizeCodeBlock';

describe('framework rendering', () => {
  it('resolves the Vanilla JS package and skill suffix to js', () => {
    const context = getFrameworkRenderContext('vanilla-js');

    expect(context).toMatchObject({
      framework: 'vanilla-js',
      frameworkName: 'Vanilla JS',
      frameworkSuffix: 'js',
      componentPackageName: '@porsche-design-system/components-js',
      componentPackageWindowsPath: '@porsche-design-system\\components-js',
    });
    expect(context.getSkillName('knowledge')).toBe('pds-knowledge-js');
  });

  it('resolves a value for every supported framework', () => {
    expect(resolveFrameworkValues(({ componentPackageName }) => componentPackageName)).toEqual({
      'vanilla-js': '@porsche-design-system/components-js',
      angular: '@porsche-design-system/components-angular',
      react: '@porsche-design-system/components-react',
      vue: '@porsche-design-system/components-vue',
    });
  });

  it('normalizes outer blank lines and common indentation', () => {
    expect(
      normalizeCodeBlock(`
        first
          second

        third
      `)
    ).toBe('first\n  second\n\nthird');
  });

  it('normalizes line endings and empty input', () => {
    expect(normalizeCodeBlock('\r\n  first\r\n  second\r\n')).toBe('first\nsecond');
    expect(normalizeCodeBlock(' \n\t')).toBe('');
  });
});
