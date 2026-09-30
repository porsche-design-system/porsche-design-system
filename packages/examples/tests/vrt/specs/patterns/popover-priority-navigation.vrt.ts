import { expect, test } from '@playwright/test';
import { getExampleUrl, setupExamplePage, waitForStablePosition } from '../../../helpers/index.ts';
import { getViewportWidth, testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/popover/priority-navigation` – a bar that moves the entries it cannot fit into a popover, captured
 * with that popover open.
 */

const id = 'patterns-popover-priority-navigation';
const url = getExampleUrl(id);

testInitialStates(id);

test('overflow popover open', async ({ page }) => {
  const viewportWidth = getViewportWidth();
  await setupExamplePage(page, url, viewportWidth);

  await page.locator('#more-button').click();
  await expect(page.locator('#more-button button')).toHaveAttribute('aria-expanded', 'true');
  await waitForStablePosition(page.locator('#overflow-list'));
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--overflow-open--${viewportWidth}.png`);
});
