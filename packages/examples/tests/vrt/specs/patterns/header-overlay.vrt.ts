import { expect, test } from '@playwright/test';

import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/header/overlay` – the header over a hero video, and the navigation drilldown it opens.
 */

const id = 'patterns-header-overlay';
const url = getExampleUrl(id);

testInitialStates(id);

test('navigation drilldown open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('#nav-button').click();
  // The host stays a zero-height anchor in the header; what opens is the `dialog` in its shadow root.
  await expect(page.locator('#nav-drilldown dialog')).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--drilldown-open--${device}.png`);
});
