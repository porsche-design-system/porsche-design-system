import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { describe, expect, it } from 'vitest';
import { configDefaults } from 'vitest/config';

describe('vitestConfig', () => {
  it('should provide the shared defaults', () => {
    expect(vitestConfig.test).toEqual({
      globals: true,
      environment: 'jsdom',
      taskTitleValueFormatTruncate: Number.MAX_SAFE_INTEGER,
      clearMocks: true,
      restoreMocks: true,
      exclude: [...configDefaults.exclude, '**/dist/**'],
      setupFiles: ['@porsche-design-system/testing/vitest-console-guard'],
    });
  });

  it.each([{ value: 'a string value longer than the forty characters Vitest keeps by default' }])(
    'should keep $value whole in a test title',
    ({ value }) => {
      expect(expect.getState().currentTestName).toContain(`should keep ${value} whole in a test title`);
    }
  );
});
