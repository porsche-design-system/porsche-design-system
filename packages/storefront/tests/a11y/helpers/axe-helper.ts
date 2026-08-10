import { AxeBuilder } from '@axe-core/playwright';
import { test as base } from '@playwright/test';

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

// Extend base test by providing "makeAxeBuilder"
//
// This new "test" can be used in multiple test files, and each of them will get
// a consistently configured AxeBuilder instance.
export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      // biome-ignore lint/suspicious/noExplicitAny: `page` type mismatch between duplicated playwright-core versions in the dependency tree
      new AxeBuilder({ page: page as any })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .exclude('iframe')
        // rule is disabled due to unwanted refactorings in component presentation
        .disableRules('landmark-unique');
    await use(makeAxeBuilder);
  },
});
export { expect } from '@playwright/test';
