import { expect, test } from '@playwright/test';
import { getExampleUrl, setupExamplePage, waitForStablePosition } from '../../../helpers/index.ts';
import { getDevice, testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/priority-navigation` – a bar that moves the entries it cannot fit into a popover, captured
 * with that popover open on mobile, the one device where entries overflow.
 */

const id = 'patterns-popover-priority-navigation';
const url = getExampleUrl(id);

testInitialStates(id);

test('overflow popover open', async ({ page }) => {
  const device = getDevice();
  // The desktop viewport fits every entry into the bar, so there is no overflow to open – see the initial capture.
  test.skip(device === 'desktop', 'every entry fits into the bar on desktop');
  await setupExamplePage(page, url);

  await page.locator('#more-button').click();
  await expect(page.locator('#more-button button')).toHaveAttribute('aria-expanded', 'true');
  await waitForStablePosition(page.locator('#overflow-list'));
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--overflow-open--${device}.png`);
});
