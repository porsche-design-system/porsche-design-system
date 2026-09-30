import { expect, test } from '@playwright/test';
import {
  collectPageErrors,
  getExampleUrl,
  isOpen,
  setupExamplePage,
  waitForStablePosition,
} from '../../helpers/index.ts';

/**
 * `src/patterns/popover/feature-tour` – coachmarks in controlled mode, of which only one is open at a time.
 */

const url = getExampleUrl('patterns-popover-feature-tour');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('walks the steps one at a time and ends on skip', async ({ page }) => {
  await setupExamplePage(page, url);

  const steps = page.locator('[data-tour-step]');
  const openStates = () =>
    steps.evaluateAll<boolean[], HTMLElement & { open?: boolean }>((elements) =>
      elements.map((element) => element.open === true)
    );
  // Scoped to the step under test rather than picked by `:visible`, so the control clicked is unambiguous.
  const controlOf = (index: number, action: string) => steps.nth(index).locator(`[data-tour="${action}"]`);

  // "Only a single step is open at once" is the whole point of the pattern.
  await expect.poll(openStates).toEqual([true, false, false, false]);

  const next = controlOf(0, 'next');
  await waitForStablePosition(next);
  await next.click();

  await expect.poll(openStates).toEqual([false, true, false, false]);

  const skip = controlOf(1, 'skip');
  await waitForStablePosition(skip);
  await skip.click();

  await expect.poll(openStates).toEqual([false, false, false, false]);
});

test('offers the tour again after it ended', async ({ page }) => {
  await setupExamplePage(page, url);

  const steps = page.locator('[data-tour-step]');
  const openCount = () =>
    steps.evaluateAll<number, HTMLElement & { open?: boolean }>(
      (elements) => elements.filter((element) => element.open === true).length
    );

  const skip = steps.first().locator('[data-tour="skip"]');
  await waitForStablePosition(skip);
  await skip.click();
  await expect.poll(openCount).toBe(0);

  await page.locator('#restart-tour').click();

  await expect.poll(() => isOpen(steps.first())).toBe(true);
});
