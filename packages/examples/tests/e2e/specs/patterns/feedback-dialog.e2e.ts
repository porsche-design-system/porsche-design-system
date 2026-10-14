import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/feedback/dialog` – the feedback question asked inside a `p-modal`.
 *
 * The submission is deliberately delayed by 1.2s in the example to simulate a round trip, which is why the
 * confirmation is awaited rather than asserted straight after the click.
 */

const url = getExampleUrl('patterns-feedback-dialog');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('reveals the comment on a rating, confirms, and moves focus', async ({ page }) => {
  await setupExamplePage(page, url);

  await page.locator('#feedback-trigger').click();
  await expect(page.locator('#feedback-modal')).toBeVisible();

  const comment = page.locator('#feedback-comment');
  const submit = page.locator('#feedback-submit');

  // The free-text field and the submit action only appear once there is something to submit.
  await expect(comment).toBeHidden();
  await expect(submit).toBeHidden();

  await page.locator('p-segmented-control-item[value="4"]').click();

  await expect(comment).toBeVisible();
  await expect(submit).toBeVisible();

  await submit.click();

  await expect(page.locator('#feedback-thanks')).toBeVisible();
  await expect(page.locator('#feedback-form')).toBeHidden();
  // The confirmation replaces the question, so focus has to be taken to it – otherwise it is never announced.
  await expect(page.locator('#feedback-thanks-heading')).toBeFocused();
});

test('resets only once the dialog is fully hidden', async ({ page }) => {
  await setupExamplePage(page, url);

  await page.locator('#feedback-trigger').click();
  await page.locator('p-segmented-control-item[value="4"]').click();
  await page.locator('#feedback-submit').click();
  await expect(page.locator('#feedback-thanks')).toBeVisible();

  // The reset runs on `motionHiddenEnd` rather than on close, so the content does not snap back while the dialog is
  // still on screen. Re-opening is what proves it ran at all.
  await page.locator('#feedback-close').click();
  await expect(page.locator('#feedback-modal')).toBeHidden();

  await page.locator('#feedback-trigger').click();

  await expect(page.locator('#feedback-form')).toBeVisible();
  await expect(page.locator('#feedback-thanks')).toBeHidden();
  await expect(page.locator('#feedback-comment')).toBeHidden();
});

test('cancels a pending submission when the dialog is dismissed', async ({ page }) => {
  await page.clock.install();
  await setupExamplePage(page, url);

  await page.locator('#feedback-trigger').click();
  await page.locator('p-segmented-control-item[value="4"]').click();
  await page.locator('#feedback-submit').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#feedback-modal')).toBeHidden();

  // Outlast the simulated request, which would otherwise reveal the confirmation behind the closed dialog.
  await page.clock.runFor(1500);
  await page.locator('#feedback-trigger').click();

  await expect(page.locator('#feedback-form')).toBeVisible();
  await expect(page.locator('#feedback-thanks')).toBeHidden();
  await expect(page.locator('#feedback-submit')).toBeHidden();
});
