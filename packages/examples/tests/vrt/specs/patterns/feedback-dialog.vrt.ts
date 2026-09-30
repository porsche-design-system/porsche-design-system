import { expect, type Page, test } from '@playwright/test';
import { getExampleUrl, setupExamplePage, waitForStablePosition } from '../../../helpers/index.ts';
import { getViewportWidth, testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/feedback/dialog` – the feedback question asked inside a `p-modal`, which the initial state never shows.
 *
 * The dialog covers the viewport, so its states are captured at viewport size: the page behind it is the initial
 * state, which is captured in full already.
 */

const id = 'patterns-feedback-dialog';
const url = getExampleUrl(id);

testInitialStates(id);

/** The panel of `p-modal` is the `dialog` in its shadow root – the host is `display: contents` and has no box. */
const getModalPanel = (page: Page) => page.locator('#feedback-modal dialog');

test('dialog open', async ({ page }) => {
  const viewportWidth = getViewportWidth();
  await setupExamplePage(page, url, viewportWidth);

  await page.locator('#feedback-trigger').click();
  await expect(page.locator('#feedback-modal')).toBeVisible();
  await waitForStablePosition(getModalPanel(page));
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--dialog-open--${viewportWidth}.png`);
});

test('dialog open with a rating chosen', async ({ page }) => {
  const viewportWidth = getViewportWidth();
  await setupExamplePage(page, url, viewportWidth);

  await page.locator('#feedback-trigger').click();
  await expect(page.locator('#feedback-modal')).toBeVisible();
  await page.locator('p-segmented-control-item[value="4"]').click();
  await expect(page.locator('#feedback-comment')).toBeVisible();
  await expect(page.locator('#feedback-submit')).toBeVisible();
  await waitForStablePosition(getModalPanel(page));
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--dialog-rated--${viewportWidth}.png`);
});

test('dialog open with the confirmation', async ({ page }) => {
  const viewportWidth = getViewportWidth();
  await setupExamplePage(page, url, viewportWidth);

  await page.locator('#feedback-trigger').click();
  await expect(page.locator('#feedback-modal')).toBeVisible();
  await page.locator('p-segmented-control-item[value="4"]').click();
  await page.locator('#feedback-submit').click();
  // The example delays the submission to simulate a round trip, so the confirmation is awaited.
  await expect(page.locator('#feedback-thanks')).toBeVisible();
  await waitForStablePosition(getModalPanel(page));
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--dialog-confirmation--${viewportWidth}.png`);
});
