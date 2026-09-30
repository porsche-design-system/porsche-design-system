import { ids } from '../../../../src/_ids.ts';
import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, scanMatrix, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/templates/landing-page` – the full page chrome, and the navigation drilldown its header opens.
 */

const id = 'templates-landing-page';
const url = getExampleUrl(id);

testInitialStates(id);

for (const { viewportWidth, scheme } of scanMatrix) {
  test(`navigation drilldown open at ${viewportWidth} with color-scheme ${scheme}`, async ({
    page,
    makeAxeBuilder,
  }, testInfo) => {
    await setupExamplePage(page, url, { viewportWidth, prefersColorScheme: scheme });

    await page.locator(`#${ids.navButton}`).click();
    // The host stays a zero-height anchor in the header; the overlay is the `dialog` in its shadow root.
    await expect(page.locator(`#${ids.navDrilldown} dialog`)).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}-drilldown-open-${viewportWidth}-${scheme}`);
  });
}
