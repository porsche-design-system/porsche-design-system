import { schemes } from '@porsche-design-system/shared/testing';
import { ids } from '../../../../src/_ids.ts';
import { getExampleUrl, setupExamplePage, waitForComponentsReady } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/local-market-switch` – the market switch open on load, the profile menu that replaces it, and
 * the navigation drilldown of the header.
 *
 * The profile menu is a `p-popover` from 480 up and a `p-sheet` below, so the two devices scan one each.
 */

const id = 'patterns-popover-local-market-switch';
const url = getExampleUrl(id);

testInitialStates(id);

for (const scheme of schemes) {
  test(`profile menu open with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator('#profile-button').click();
    // Mirrored onto the control in the shadow root of the trigger, whichever container the viewport called for.
    await expect(page.locator('#profile-button button')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#market-dismiss')).toBeHidden();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--profile-open--${scheme}`);
  });

  test(`navigation drilldown open with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.locator(`#${ids.navButton}`).click();
    // The host stays a zero-height anchor in the header; the overlay is the `dialog` in its shadow root.
    await expect(page.locator(`#${ids.navDrilldown} dialog`)).toBeVisible();
    await waitForComponentsReady(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--drilldown-open--${scheme}`);
  });
}
