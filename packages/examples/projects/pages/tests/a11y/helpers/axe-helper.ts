import { AxeBuilder } from '@axe-core/playwright';
import { test as base } from '@playwright/test';

/**
 * A consistently configured `AxeBuilder` for the example pages.
 *
 * Unlike the component suites of `packages/components-js`, nothing is scoped or disabled here. Those tests render a
 * single component in isolation, which is why they have to switch off the rules that ask for a page-level `main`, a
 * first level heading and content inside landmarks. An example is a **whole page** – a template even ships the full
 * chrome – so exactly those rules are the ones worth running: they are the accessibility baseline this package
 * promises, checked on the composed and upgraded page rather than on the rendered markup.
 *
 * `best-practice` is therefore part of the tag list, not just the WCAG tags. If a rule ever has to be switched off
 * for one page, disable it on that page with a comment saying why, rather than widening this fixture.
 */

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']);

    await use(makeAxeBuilder);
  },
});

export { expect } from '@playwright/test';
