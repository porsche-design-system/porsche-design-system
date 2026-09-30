import { ids } from '../../../../src/_ids.ts';
import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, scanMatrix, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/header/overlay` – the header over a hero video, and the navigation drilldown it opens.
 */

const id = 'patterns-header-overlay';
const url = getExampleUrl(id);

testInitialStates(id);

for (const { viewportWidth, scheme } of scanMatrix) {
  test(`navigation drilldown open at ${viewportWidth} with color-scheme ${scheme}`, async ({
    page,
    makeAxeBuilder,
  }, testInfo) => {
    await setupExamplePage(page, url, viewportWidth, { prefersColorScheme: scheme });

    await page.locator(`#${ids.navButton}`).click();
    // The host stays a zero-height anchor in the header; the overlay is the `dialog` in its shadow root.
    await expect(page.locator(`#${ids.navDrilldown} dialog`)).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}-drilldown-open-${viewportWidth}-${scheme}`);
  });
}
