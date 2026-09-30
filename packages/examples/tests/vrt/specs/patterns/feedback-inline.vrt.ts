import { expect, test } from '@playwright/test';
import { getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { getViewportWidth, testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/feedback/inline` – the feedback question asked in place, the comment a rating reveals and the
 * confirmation that replaces the question.
 */

const id = 'patterns-feedback-inline';
const url = getExampleUrl(id);

testInitialStates(id);

test('rating chosen', async ({ page }) => {
  const viewportWidth = getViewportWidth();
  await setupExamplePage(page, url, viewportWidth);

  await page.locator('p-segmented-control-item[value="4"]').click();
  await expect(page.locator('#feedback-comment')).toBeVisible();
  await expect(page.locator('#feedback-submit')).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--rated--${viewportWidth}.png`, { fullPage: true });
});

test('confirmation', async ({ page }) => {
  const viewportWidth = getViewportWidth();
  await setupExamplePage(page, url, viewportWidth);

  await page.locator('p-segmented-control-item[value="4"]').click();
  await page.locator('#feedback-submit').click();
  // The example delays the submission to simulate a round trip, so the confirmation is awaited.
  await expect(page.locator('#feedback-thanks')).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--confirmation--${viewportWidth}.png`, { fullPage: true });
});
