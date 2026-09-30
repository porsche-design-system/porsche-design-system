import { expect, test } from '@playwright/test';
import { ids } from '../../../../src/_ids.ts';

import { getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { getDevice, testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/header/overlay` – the header over a hero video, and the navigation drilldown it opens.
 */

const id = 'patterns-header-overlay';
const url = getExampleUrl(id);

testInitialStates(id);

test('navigation drilldown open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator(`#${ids.navButton}`).click();
  // The host stays a zero-height anchor in the header; what opens is the `dialog` in its shadow root.
  await expect(page.locator(`#${ids.navDrilldown} dialog`)).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--drilldown-open--${device}.png`);
});
