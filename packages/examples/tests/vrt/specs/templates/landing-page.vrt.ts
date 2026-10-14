import { expect, test } from '@playwright/test';

import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/templates/landing-page` – the full page chrome, and the navigation drilldown its header opens.
 */

const id = 'templates-landing-page';
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
