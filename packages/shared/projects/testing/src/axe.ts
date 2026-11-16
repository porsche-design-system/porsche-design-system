import { AxeBuilder } from '@axe-core/playwright';
import { test as base } from '@playwright/test';

type AxeTestOptions = {
  include?: string;
  exclude?: string;
  disableRules?: string[];
};

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

// Extends the base test with a consistently configured `makeAxeBuilder`; each suite passes its own scope and rules.
export const createAxeTest = ({ include, exclude, disableRules }: AxeTestOptions = {}) =>
  base.extend<AxeFixture>({
    makeAxeBuilder: async ({ page }, use) => {
      const makeAxeBuilder = () => {
        let builder = new AxeBuilder({ page }).withTags([
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22aa',
          'best-practice',
        ]);
        if (include) builder = builder.include(include);
        if (exclude) builder = builder.exclude(exclude);
        if (disableRules) builder = builder.disableRules(disableRules);
        return builder;
      };

      await use(makeAxeBuilder);
    },
  });
