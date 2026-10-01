import { expect, test } from '@playwright/test';

import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/header/stacked` – the header with category tabs below it, and the navigation drilldown it opens.
 */

const id = 'patterns-header-stacked';
const url = getExampleUrl(id);

testInitialStates(id, {
  // The category tabs decide on a scroll affordance from their own width, and at 200% font size that decision flips
  // back and forth while the suite runs in parallel: the page is 34px taller in one frame than in the next, so the
  // capture never reaches two identical screenshots. It settles when the page is opened on its own, which makes it a
  // property of the pattern rather than of the test – the other captures of this page still cover it.
  skipFontSize200: 'the category tabs do not settle at 200% font size under load',
});

test('navigation drilldown open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('#nav-button').click();
  // The host stays a zero-height anchor in the header; what opens is the `dialog` in its shadow root.
  await expect(page.locator('#nav-drilldown dialog')).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--drilldown-open--${device}.png`);
});
