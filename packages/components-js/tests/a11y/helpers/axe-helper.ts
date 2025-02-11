import { AxeBuilder } from '@axe-core/playwright';
import { test as base } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';

const deprecatedComponents = (TAG_NAMES as unknown as TagName[]).filter((tagName) => {
  const { isDeprecated } = getComponentMeta(tagName);
  return isDeprecated;
});

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

// Extend base test by providing "makeAxeBuilder"
//
// This new "test" can be used in multiple test files, and each of them will get
// a consistently configured AxeBuilder instance.
export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use, testInfo) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .include('#app')
        .exclude(
          `:is(.skip-axe-core-test, ${deprecatedComponents.map((component) => {
            return component + ',my-prefix-' + component;
          })})`
        )
        // disable some "best-practice" rules referring to general page compliance which is not needed because only components itself are tested
        .disableRules(['region', 'landmark-one-main', 'page-has-heading-one', 'landmark-unique', 'heading-order']);

    await use(makeAxeBuilder);
  },
});
export { expect } from '@playwright/test';
