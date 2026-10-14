import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/feedback/inline` – the feedback question asked in place.
 *
 * The submission is deliberately delayed by 1.2s in the example to simulate a round trip, which is why the
 * confirmation is awaited rather than asserted straight after the click.
 */

const url = getExampleUrl('patterns-feedback-inline');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('reveals the comment on a rating, confirms, and moves focus', async ({ page }) => {
  await setupExamplePage(page, url);

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

test('restarts the flow and returns focus to the question', async ({ page }) => {
  await setupExamplePage(page, url);

  await page.locator('p-segmented-control-item[value="4"]').click();
  await page.locator('#feedback-submit').click();
  await expect(page.locator('#feedback-thanks')).toBeVisible();

  await page.locator('#feedback-restart').click();

  await expect(page.locator('#feedback-thanks')).toBeHidden();
  await expect(page.locator('#feedback-form')).toBeVisible();
  await expect(page.locator('#feedback-question')).toBeFocused();
  // Starting over has to start over: a rating left behind would submit the previous answer again.
  await expect(page.locator('#feedback-comment')).toBeHidden();
  await expect(page.locator('#feedback-submit')).toBeHidden();
});
