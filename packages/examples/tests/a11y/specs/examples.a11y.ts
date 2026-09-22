import type { AxeBuilder } from '@axe-core/playwright';
import type { TestInfo } from '@playwright/test';
import { schemes, viewportWidthM, viewportWidthXXS } from '@porsche-design-system/shared/testing';
import { ids } from '../../../src/_ids.ts';
import { setupExamplePage, waitForComponentsReady } from '../../vrt/helpers/index.ts';
import { getExamplePages } from '../../vrt/helpers/pages.ts';
import { expect, test } from '../helpers/index.ts';

/**
 * Accessibility of every example, scanned with axe-core.
 *
 * This suite covers the layer the other two cannot reach. The unit tests assert the **rendered markup** – one `main`
 * landmark per page, no unlabelled `<nav>`, at most one first level heading, `aria-current` on the active item – and
 * they do it before a browser is involved. What they cannot see is everything the browser computes: the contrast of
 * a colour pair, the accessible name a label resolves to **through a shadow root**, whether an `aria-*` value is
 * valid on the role it ends up on, or whether a control is still reachable once the components have upgraded.
 *
 * That is what is scanned here, on the composed page, against the built projects.
 *
 * The matrix is the one the component suites of `packages/components-js` use: two viewports × the two colour
 * schemes. The viewports are the ends of the responsive behaviour the examples demonstrate – at 320 the navigation
 * is a drilldown behind a menu button, at 1000 it is a bar – and the schemes are what the contrast rules depend on.
 *
 * Pages are globbed from `*.page.tsx` exactly as in the VRT, so a new example is scanned without touching this file.
 */

const examplePages = getExamplePages();

const viewportWidths = [viewportWidthXXS, viewportWidthM];

/**
 * Pages that legitimately have no first level heading.
 *
 * `page-has-heading-one` is a best-practice rule about *pages*, and the footer pattern is not one: it demonstrates a
 * single section in the place it occupies, and a heading above it would be content the pattern is not about. The
 * unit tests encode the same exception – every page has **at most** one first level heading, and only a template is
 * required to have exactly one.
 *
 * This is a property of that example, so it is listed here rather than switched off in the fixture for everyone.
 */
const pagesWithoutFirstLevelHeading = ['patterns-footer'];

/** The pages whose own `main.js` ends in a confirmation the initial scan never reaches. */
const feedbackPages = ['patterns-feedback-inline', 'patterns-feedback-dialog'];

test('should have a page for every example', () => {
  // The same count the VRT asserts: 3 templates and 9 patterns. Kept here too, so a glob that silently stops
  // matching fails the suite instead of passing it with nothing to scan.
  expect(examplePages.length).toBe(12);
});

/** The rules that do not apply to a page, by what that page is – never a blanket exception. */
const getDisabledRules = (id: string): string[] =>
  pagesWithoutFirstLevelHeading.includes(id) ? ['page-has-heading-one'] : [];

/** Scans with the given builder and attaches the violations, so a CI failure is readable without a rerun. */
const expectNoViolations = async (builder: AxeBuilder, testInfo: TestInfo, name: string): Promise<void> => {
  const { violations } = await builder.analyze();

  await testInfo.attach(`a11y-scan-results-${name}`, {
    body: JSON.stringify(violations, null, 2),
    contentType: 'application/json',
  });

  expect(violations).toEqual([]);
};

for (const { id, url } of examplePages) {
  test.describe(id, () => {
    for (const viewportWidth of viewportWidths) {
      for (const scheme of schemes) {
        test(`initial state at ${viewportWidth} with color-scheme ${scheme}`, async ({
          page,
          makeAxeBuilder,
        }, testInfo) => {
          await setupExamplePage(page, url, viewportWidth, { prefersColorScheme: scheme });

          await expectNoViolations(
            makeAxeBuilder().disableRules(getDisabledRules(id)),
            testInfo,
            `${id}-${viewportWidth}-${scheme}`
          );
        });
      }
    }
  });
}

for (const { id, url } of examplePages) {
  test.describe(id, () => {
    test('with the navigation drilldown open', async ({ page, makeAxeBuilder }, testInfo) => {
      // The narrow viewport is where the menu button is the only way into the navigation.
      await setupExamplePage(page, url, viewportWidthXXS);

      // Keyed off the id the page renders rather than a list of page names – the same rule `plugins/entries.ts`
      // uses to decide whether the drilldown snippet is inlined into this page's entry at all.
      test.skip((await page.locator(`#${ids.navButton}`).count()) === 0, 'this example renders no menu button');

      await page.locator(`#${ids.navButton}`).click();
      // The drilldown is used in controlled mode: `assets/header.js` sets the `open` **property**, which the
      // component does not reflect to an attribute. The host is not what becomes visible either – it stays a
      // zero-height anchor in the header, and the overlay is the `dialog` in its shadow root, which is what the
      // scan below has to find on the page.
      await expect(page.locator(`#${ids.navDrilldown} dialog`)).toBeVisible();
      await waitForComponentsReady(page);

      await expectNoViolations(makeAxeBuilder().disableRules(getDisabledRules(id)), testInfo, `${id}-drilldown-open`);
    });
  });
}

/**
 * The confirmation of the feedback flow, which replaces the question it is scanned instead of.
 *
 * The dialog variant is opened first, so the scan covers the `p-modal` as well – a dialog is exactly the kind of
 * surface where a missing name or an unreachable control matters.
 */
for (const { id, url } of examplePages.filter((page) => feedbackPages.includes(page.id))) {
  test.describe(id, () => {
    test('in the confirmation state', async ({ page, makeAxeBuilder }, testInfo) => {
      await setupExamplePage(page, url, viewportWidthM);

      if (id === 'patterns-feedback-dialog') {
        await page.locator('#feedback-trigger').click();
        await expect(page.locator('#feedback-modal')).toBeVisible();
      }

      await page.locator('p-segmented-control-item[value="4"]').click();
      await page.locator('#feedback-submit').click();
      await expect(page.locator('#feedback-thanks')).toBeVisible();
      await waitForComponentsReady(page);

      await expectNoViolations(makeAxeBuilder().disableRules(getDisabledRules(id)), testInfo, `${id}-confirmation`);
    });
  });
}
