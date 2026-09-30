import { expect, test } from '@playwright/test';
import { getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { getDevice, testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/feedback/inline` – the feedback question asked in place, the comment a rating reveals and the
 * confirmation that replaces the question.
 */

const id = 'patterns-feedback-inline';
const url = getExampleUrl(id);

testInitialStates(id);

test('rating chosen', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('p-segmented-control-item[value="4"]').click();
  await expect(page.locator('#feedback-comment')).toBeVisible();
  await expect(page.locator('#feedback-submit')).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--rated--${device}.png`, { fullPage: true });
});

test('confirmation', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('p-segmented-control-item[value="4"]').click();
  await page.locator('#feedback-submit').click();
  // The example delays the submission to simulate a round trip, so the confirmation is awaited.
  await expect(page.locator('#feedback-thanks')).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--confirmation--${device}.png`, { fullPage: true });
});
