import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { describe, expect, it } from 'vitest';
import { configDefaults } from 'vitest/config';

describe('vitestConfig', () => {
  it('should provide the shared defaults', () => {
    expect(vitestConfig.test).toEqual({
      globals: true,
      environment: 'jsdom',
      taskTitleValueFormatTruncate: 0,
      clearMocks: true,
      restoreMocks: true,
      exclude: [...configDefaults.exclude, '**/dist/**'],
      setupFiles: ['@porsche-design-system/testing/vitest-console-guard'],
    });
  });
});
