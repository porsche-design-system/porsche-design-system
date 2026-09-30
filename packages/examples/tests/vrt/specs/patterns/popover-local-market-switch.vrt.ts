import { expect, test } from '@playwright/test';
import { ids } from '../../../../src/_ids.ts';

import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/local-market-switch` – the market switch open on load, the profile menu that replaces it, and
 * the navigation drilldown of the header.
 *
 * The profile menu is a `p-popover` from 480 up and a `p-sheet` below, so the two projects capture one each.
 */

const id = 'patterns-popover-local-market-switch';
const url = getExampleUrl(id);

testInitialStates(id);

test('profile menu open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('#profile-button').click();
  // Mirrored onto the control in the shadow root of the trigger, whichever container the viewport called for.
  await expect(page.locator('#profile-button button')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#market-dismiss')).toBeHidden();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--profile-open--${device}.png`);
});

test('navigation drilldown open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator(`#${ids.navButton}`).click();
  // The host stays a zero-height anchor in the header; what opens is the `dialog` in its shadow root.
  await expect(page.locator(`#${ids.navDrilldown} dialog`)).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--drilldown-open--${device}.png`);
});
