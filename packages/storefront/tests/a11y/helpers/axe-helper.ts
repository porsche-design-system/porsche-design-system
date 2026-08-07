import { AxeBuilder } from '@axe-core/playwright';
import { test as base } from '@playwright/test';
import type { Page } from 'playwright-core';

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
      // `page` type technically differs from `@axe-core/playwright`'s expected `playwright-core` `Page` type
      // due to a duplicated `playwright-core` install (structurally compatible, differing only in minor version typings)
      new AxeBuilder({ page: page as unknown as Page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .exclude('iframe')
        // rule is disabled due to unwanted refactorings in component presentation
        .disableRules('landmark-unique');
    await use(makeAxeBuilder);
  },
});
export { expect } from '@playwright/test';
