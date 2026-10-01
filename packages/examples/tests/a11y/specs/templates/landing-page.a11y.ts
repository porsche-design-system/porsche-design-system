import { schemes } from '@porsche-design-system/shared/testing';
import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/templates/landing-page` – the full page chrome, and the navigation drilldown its header opens.
 */

const id = 'templates-landing-page';
const url = getExampleUrl(id);

testInitialStates(id);

for (const scheme of schemes) {
  test(`navigation drilldown open with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator('#nav-button').click();
    // The host stays a zero-height anchor in the header; the overlay is the `dialog` in its shadow root.
    await expect(page.locator('#nav-drilldown dialog')).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--drilldown-open--${scheme}`);
  });
}
